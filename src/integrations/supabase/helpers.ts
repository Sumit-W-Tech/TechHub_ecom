import { supabase } from "./client";

export type Profile = {
  id: string;
  user_id: string;
  name: string;
  email: string;
  role: string;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
};

export type Conversation = {
  id: string;
  buyer_id: string;
  seller_id: string;
  product_id: string | null;
  product_name: string | null;
  last_message: string | null;
  last_message_at: string | null;
  created_at: string;
};

export type Message = {
  id: string;
  conversation_id: string;
  sender_id: string;
  content: string;
  read: boolean;
  created_at: string;
};

export type Notification = {
  id: string;
  recipient_id: string;
  type: string;
  title: string;
  content: string;
  read: boolean;
  conversation_id: string | null;
  created_at: string;
};

export async function getProfile(userId: string) {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("user_id", userId)
    .maybeSingle();
  return { data: data as Profile | null, error };
}

export async function updateProfile(userId: string, updates: Partial<Profile>) {
  const { data, error } = await supabase
    .from("profiles")
    .update(updates)
    .eq("user_id", userId)
    .select()
    .maybeSingle();
  return { data: data as Profile | null, error };
}

export async function getConversations(userId: string) {
  const { data, error } = await supabase
    .from("conversations")
    .select("*")
    .or(`buyer_id.eq.${userId},seller_id.eq.${userId}`)
    .order("last_message_at", { ascending: false });
  return { data: (data || []) as Conversation[], error };
}

export async function getOrCreateConversation(buyerId: string, sellerId: string, productId: string, productName: string) {
  // Try to find existing
  const { data: existing } = await supabase
    .from("conversations")
    .select("*")
    .eq("buyer_id", buyerId)
    .eq("seller_id", sellerId)
    .eq("product_id", productId)
    .maybeSingle();

  if (existing) return { data: existing as Conversation, error: null };

  const { data, error } = await supabase
    .from("conversations")
    .insert({ buyer_id: buyerId, seller_id: sellerId, product_id: productId, product_name: productName })
    .select()
    .single();
  return { data: data as Conversation, error };
}

export async function getMessages(conversationId: string) {
  const { data, error } = await supabase
    .from("messages")
    .select("*")
    .eq("conversation_id", conversationId)
    .order("created_at", { ascending: true });
  return { data: (data || []) as Message[], error };
}

export async function sendMessage(conversationId: string, senderId: string, content: string) {
  const { data, error } = await supabase
    .from("messages")
    .insert({ conversation_id: conversationId, sender_id: senderId, content })
    .select()
    .single();
  return { data: data as Message, error };
}

export async function getNotifications(userId: string) {
  const { data, error } = await supabase
    .from("notifications")
    .select("*")
    .eq("recipient_id", userId)
    .order("created_at", { ascending: false })
    .limit(50);
  return { data: (data || []) as Notification[], error };
}

export async function markNotificationRead(notificationId: string) {
  return supabase.from("notifications").update({ read: true }).eq("id", notificationId);
}

export async function markAllNotificationsRead(userId: string) {
  return supabase.from("notifications").update({ read: true }).eq("recipient_id", userId).eq("read", false);
}

export async function getProfileByUserId(userId: string) {
  const { data } = await supabase.from("profiles").select("name").eq("user_id", userId).maybeSingle();
  return data?.name || "Unknown";
}
