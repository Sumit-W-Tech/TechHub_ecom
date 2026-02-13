import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/AuthContext";
import {
  getConversations, getMessages, sendMessage as sendMsg, getOrCreateConversation,
  type Conversation, type Message,
} from "@/integrations/supabase/helpers";

export function useChat() {
  const { user } = useAuth();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConversation, setActiveConversation] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loadingConversations, setLoadingConversations] = useState(true);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [partnerNames, setPartnerNames] = useState<Record<string, string>>({});

  const fetchConversations = useCallback(async () => {
    if (!user) return;
    const { data } = await getConversations(user.id);
    setConversations(data);
    setLoadingConversations(false);

    // Fetch partner names
    const partnerIds = new Set<string>();
    data.forEach((c) => {
      const partnerId = c.buyer_id === user.id ? c.seller_id : c.buyer_id;
      partnerIds.add(partnerId);
    });
    if (partnerIds.size > 0) {
      const { data: profiles } = await supabase
        .from("profiles")
        .select("user_id, name")
        .in("user_id", Array.from(partnerIds));
      if (profiles) {
        const map: Record<string, string> = {};
        profiles.forEach((p: any) => { map[p.user_id] = p.name; });
        setPartnerNames(map);
      }
    }
  }, [user?.id]);

  useEffect(() => {
    fetchConversations();
  }, [fetchConversations]);

  // Subscribe to conversation updates
  useEffect(() => {
    if (!user) return;
    const channel = supabase
      .channel("conversations-realtime")
      .on("postgres_changes", {
        event: "*",
        schema: "public",
        table: "conversations",
      }, () => {
        fetchConversations();
      })
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, [user?.id, fetchConversations]);

  const selectConversation = async (conv: Conversation) => {
    setActiveConversation(conv);
    setLoadingMessages(true);
    const { data } = await getMessages(conv.id);
    setMessages(data);
    setLoadingMessages(false);

    // Mark messages as read
    await supabase
      .from("messages")
      .update({ read: true })
      .eq("conversation_id", conv.id)
      .neq("sender_id", user!.id);
  };

  // Subscribe to new messages for active conversation
  useEffect(() => {
    if (!activeConversation) return;
    const channel = supabase
      .channel(`messages-${activeConversation.id}`)
      .on("postgres_changes", {
        event: "INSERT",
        schema: "public",
        table: "messages",
        filter: `conversation_id=eq.${activeConversation.id}`,
      }, (payload) => {
        setMessages((prev) => [...prev, payload.new as Message]);
      })
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, [activeConversation?.id]);

  const sendMessage = async (content: string) => {
    if (!user || !activeConversation || !content.trim()) return;
    await sendMsg(activeConversation.id, user.id, content.trim());
  };

  const startConversation = async (sellerId: string, productId: string, productName: string) => {
    if (!user) return null;
    const { data, error } = await getOrCreateConversation(user.id, sellerId, productId, productName);
    if (error || !data) return null;
    await fetchConversations();
    return data;
  };

  const getPartnerName = (conv: Conversation) => {
    if (!user) return "Unknown";
    const partnerId = conv.buyer_id === user.id ? conv.seller_id : conv.buyer_id;
    return partnerNames[partnerId] || "Loading...";
  };

  return {
    conversations, activeConversation, messages,
    loadingConversations, loadingMessages,
    selectConversation, sendMessage, startConversation, getPartnerName,
    setActiveConversation,
  };
}
