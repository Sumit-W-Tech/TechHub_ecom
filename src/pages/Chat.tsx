import { useState, useRef, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useChat } from "@/hooks/useChat";
import { Button } from "@/components/ui/button";
import { MessageSquare, Send, ArrowLeft, Loader2 } from "lucide-react";
import { Link, Navigate } from "react-router-dom";
import type { Conversation } from "@/integrations/supabase/helpers";

const Chat = () => {
  const { user, isAuthenticated, loading: authLoading } = useAuth();
  const {
    conversations, activeConversation, messages,
    loadingConversations, loadingMessages,
    selectConversation, sendMessage, getPartnerName, setActiveConversation,
  } = useChat();
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (authLoading) return <div className="flex items-center justify-center min-h-[60vh]"><Loader2 className="h-6 w-6 animate-spin text-primary" /></div>;
  if (!isAuthenticated) return <Navigate to="/login" replace />;

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    const msg = newMessage;
    setNewMessage("");
    await sendMessage(msg);
  };

  const ConversationList = () => (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b border-border">
        <h2 className="font-display font-bold text-lg">Messages</h2>
      </div>
      <div className="flex-1 overflow-y-auto">
        {loadingConversations ? (
          <div className="flex items-center justify-center py-12"><Loader2 className="h-5 w-5 animate-spin text-muted-foreground" /></div>
        ) : conversations.length === 0 ? (
          <div className="text-center py-12 px-4">
            <MessageSquare className="h-10 w-10 text-muted-foreground/30 mx-auto mb-3" />
            <p className="text-sm text-muted-foreground">No conversations yet</p>
            <Link to="/products">
              <Button variant="outline" size="sm" className="mt-3">Browse Products</Button>
            </Link>
          </div>
        ) : (
          conversations.map((conv) => (
            <button
              key={conv.id}
              onClick={() => selectConversation(conv)}
              className={`w-full text-left p-4 border-b border-border hover:bg-muted/50 transition-colors ${
                activeConversation?.id === conv.id ? "bg-muted" : ""
              }`}
            >
              <p className="font-semibold text-sm truncate">{getPartnerName(conv)}</p>
              {conv.product_name && <p className="text-xs text-primary truncate">{conv.product_name}</p>}
              {conv.last_message && <p className="text-xs text-muted-foreground truncate mt-1">{conv.last_message}</p>}
            </button>
          ))
        )}
      </div>
    </div>
  );

  const ChatWindow = ({ conv }: { conv: Conversation }) => (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b border-border flex items-center gap-3">
        <button onClick={() => setActiveConversation(null)} className="md:hidden text-muted-foreground">
          <ArrowLeft className="h-5 w-5" />
        </button>
        <div>
          <p className="font-semibold text-sm">{getPartnerName(conv)}</p>
          {conv.product_name && <p className="text-xs text-muted-foreground">Re: {conv.product_name}</p>}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {loadingMessages ? (
          <div className="flex items-center justify-center py-12"><Loader2 className="h-5 w-5 animate-spin text-muted-foreground" /></div>
        ) : messages.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-8">Start the conversation!</p>
        ) : (
          messages.map((msg) => {
            const isMe = msg.sender_id === user!.id;
            return (
              <div key={msg.id} className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[75%] rounded-2xl px-4 py-2.5 text-sm ${
                  isMe ? "bg-primary text-primary-foreground rounded-br-md" : "bg-muted rounded-bl-md"
                }`}>
                  <p>{msg.content}</p>
                  <p className={`text-[10px] mt-1 ${isMe ? "text-primary-foreground/60" : "text-muted-foreground"}`}>
                    {new Date(msg.created_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </p>
                </div>
              </div>
            );
          })
        )}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSend} className="p-4 border-t border-border flex gap-2">
        <input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 rounded-lg border border-input bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
        />
        <Button type="submit" size="icon" disabled={!newMessage.trim()}>
          <Send className="h-4 w-4" />
        </Button>
      </form>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-4">
      <div className="rounded-2xl border border-border bg-card overflow-hidden" style={{ height: "calc(100vh - 140px)" }}>
        <div className="flex h-full">
          {/* Sidebar - always visible on desktop, hidden when chat open on mobile */}
          <div className={`w-full md:w-80 md:border-r md:border-border flex-shrink-0 ${activeConversation ? "hidden md:flex md:flex-col" : "flex flex-col"}`}>
            <ConversationList />
          </div>

          {/* Chat area */}
          <div className={`flex-1 ${activeConversation ? "flex flex-col" : "hidden md:flex md:flex-col"}`}>
            {activeConversation ? (
              <ChatWindow conv={activeConversation} />
            ) : (
              <div className="flex-1 flex items-center justify-center text-center p-8">
                <div>
                  <MessageSquare className="h-12 w-12 text-muted-foreground/20 mx-auto mb-3" />
                  <p className="text-muted-foreground">Select a conversation to start chatting</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
