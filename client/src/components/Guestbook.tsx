import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient, apiRequest } from "@/lib/queryClient";
import type { GuestbookMessage } from "@shared/schema";
import { Win95Scrollbar } from "./Win95Scrollbar";

const USERNAME_COLORS = [
  "#FF0000", "#0000FF", "#008000", "#FF00FF", "#800080",
  "#008080", "#FF6600", "#CC0066", "#006699", "#990000",
  "#660099", "#009900", "#CC3300", "#0066CC", "#990066",
];

const getColorForUsername = (username: string): string => {
  let hash = 0;
  for (let i = 0; i < username.length; i++) {
    hash = username.charCodeAt(i) + ((hash << 5) - hash);
  }
  return USERNAME_COLORS[Math.abs(hash) % USERNAME_COLORS.length];
};

const WIN95_EMOJIS = [
  { emoji: ":-)", label: "smile" },
  { emoji: ":-(", label: "sad" },
  { emoji: ";-)", label: "wink" },
  { emoji: ":-D", label: "grin" },
  { emoji: ":-P", label: "tongue" },
  { emoji: ":-O", label: "surprised" },
  { emoji: ":-/", label: "confused" },
  { emoji: ":-|", label: "neutral" },
  { emoji: "<3", label: "heart" },
  { emoji: ":*", label: "kiss" },
  { emoji: "B-)", label: "cool" },
  { emoji: ":'(", label: "cry" },
  { emoji: ">:)", label: "evil" },
  { emoji: "O:-)", label: "angel" },
  { emoji: ":-@", label: "angry" },
  { emoji: "8-)", label: "nerd" },
  { emoji: "(^_^)", label: "happy" },
  { emoji: "(T_T)", label: "crying" },
  { emoji: "(o_o)", label: "shocked" },
  { emoji: "(*_*)", label: "starstruck" },
  { emoji: "(>_<)", label: "frustrated" },
  { emoji: "(-_-)", label: "bored" },
  { emoji: "(^o^)", label: "excited" },
  { emoji: "\\(^-^)/", label: "celebrate" },
  { emoji: "(._. )", label: "shy" },
  { emoji: "~(^-^)~", label: "dance" },
];

export function Guestbook() {
  const [isMinimized, setIsMinimized] = useState(false);
  const [isOpen, setIsOpen] = useState(true);
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [hasSetUsername, setHasSetUsername] = useState(false);
  const messageInputRef = useRef<HTMLInputElement>(null);

  const { data: messages = [], isLoading } = useQuery<GuestbookMessage[]>({
    queryKey: ["/api/guestbook"],
    refetchInterval: 10000,
  });

  const [error, setError] = useState<string | null>(null);

  const createMutation = useMutation({
    mutationFn: async (data: { username: string; message: string }) => {
      return apiRequest("POST", "/api/guestbook", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/guestbook"] });
      setMessage("");
      setError(null);
    },
    onError: () => {
      setError("Failed to send message. Try again!");
    },
  });

  const handleSend = () => {
    if (!username.trim() || !message.trim()) return;
    
    createMutation.mutate({
      username: username.trim(),
      message: message.trim(),
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (!hasSetUsername && username.trim()) {
        setHasSetUsername(true);
        messageInputRef.current?.focus();
      } else if (hasSetUsername && message.trim()) {
        handleSend();
      }
    }
  };

  const insertEmoji = (emoji: string) => {
    setMessage((prev) => prev + " " + emoji + " ");
    setShowEmojiPicker(false);
    messageInputRef.current?.focus();
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return "just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    return `${diffDays}d ago`;
  };

  if (!isOpen) {
    return (
      <motion.button
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.05 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 left-4 z-50 flex items-center gap-2 px-3 py-2"
        style={{
          backgroundColor: "#C0C0C0",
          borderTop: "2px solid #fff",
          borderLeft: "2px solid #fff",
          borderBottom: "2px solid #808080",
          borderRight: "2px solid #808080",
          fontFamily: "var(--font-pixel)",
          fontSize: "11px",
          color: "#000",
          cursor: "pointer",
        }}
        data-testid="button-open-guestbook"
      >
        <span style={{ fontSize: "14px" }}>&#128172;</span>
        <span>Guestbook</span>
        {messages.length > 0 && (
          <span
            className="px-1 ml-1"
            style={{
              backgroundColor: "#000080",
              color: "#fff",
              fontSize: "9px",
            }}
          >
            {messages.length}
          </span>
        )}
      </motion.button>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed bottom-4 left-4 z-50"
      style={{
        width: "380px",
        height: isMinimized ? "auto" : "300px",
        backgroundColor: "#C0C0C0",
        borderTop: "2px solid #fff",
        borderLeft: "2px solid #fff",
        borderBottom: "2px solid #808080",
        borderRight: "2px solid #808080",
        boxShadow: "4px 4px 8px rgba(0,0,0,0.5)",
      }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 4 4' xmlns='http://www.w3.org/2000/svg'%3E%3Crect x='0' y='0' width='1' height='1' fill='%23999' /%3E%3Crect x='2' y='1' width='1' height='1' fill='%23bbb' /%3E%3Crect x='1' y='2' width='1' height='1' fill='%23888' /%3E%3Crect x='3' y='3' width='1' height='1' fill='%23aaa' /%3E%3C/svg%3E")`,
          backgroundSize: "4px 4px",
          imageRendering: "pixelated" as const,
          opacity: 0.5,
          zIndex: 0,
        }}
      />
      <div className="window-scanlines" aria-hidden="true" />

      <div
        className="flex items-center justify-between px-1 py-0.5 relative z-10"
        style={{
          background: "linear-gradient(90deg, #000080, #1084d0)",
          color: "white",
        }}
      >
        <div className="flex items-center gap-1">
          <span style={{ fontSize: "12px" }}>&#128172;</span>
          <span
            className="text-[10px] font-bold"
            style={{ fontFamily: "var(--font-pixel)", textShadow: "1px 1px 0 #000" }}
          >
            Guestbook.exe
          </span>
        </div>
        <div className="flex gap-0.5">
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            className="w-4 h-4 flex items-center justify-center text-[10px] font-bold"
            style={{
              backgroundColor: "#C0C0C0",
              borderTop: "1px solid #fff",
              borderLeft: "1px solid #fff",
              borderBottom: "1px solid #808080",
              borderRight: "1px solid #808080",
              color: "#000",
            }}
            data-testid="button-minimize-guestbook"
          >
            _
          </button>
          <button
            onClick={() => setIsOpen(false)}
            className="w-4 h-4 flex items-center justify-center text-[10px] font-bold"
            style={{
              backgroundColor: "#C0C0C0",
              borderTop: "1px solid #fff",
              borderLeft: "1px solid #fff",
              borderBottom: "1px solid #808080",
              borderRight: "1px solid #808080",
              color: "#000",
            }}
            data-testid="button-close-guestbook"
          >
            X
          </button>
        </div>
      </div>

      <div
        className="flex items-center gap-3 px-1 py-0.5 text-[9px] relative z-10"
        style={{
          backgroundColor: "#C0C0C0",
          borderBottom: "1px solid #808080",
          fontFamily: "var(--font-pixel)",
          color: "#000",
        }}
      >
        {["File", "Edit", "View", "Help"].map((item) => (
          <span key={item} className="cursor-default hover:bg-[#000080] hover:text-white px-1">
            <span style={{ textDecoration: "underline" }}>{item[0]}</span>
            {item.slice(1)}
          </span>
        ))}
      </div>

      <AnimatePresence>
        {!isMinimized && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col relative z-10 overflow-hidden"
            style={{ height: "calc(100% - 40px)" }}
          >
            <div
              className="overflow-hidden"
              style={{
                margin: "6px",
                marginBottom: "0",
                backgroundColor: "#FFFEF0",
                borderTop: "2px solid #808080",
                borderLeft: "2px solid #808080",
                borderBottom: "2px solid #fff",
                borderRight: "2px solid #fff",
                flex: "1 1 0",
                minHeight: "0",
              }}
            >
              <Win95Scrollbar>
                <div className="p-2">
                  {isLoading ? (
                    <div
                      className="text-center py-4 text-[11px]"
                      style={{ fontFamily: "var(--font-pixel)", color: "#808080" }}
                    >
                      Loading messages...
                    </div>
                  ) : messages.length === 0 ? (
                    <div
                      className="text-center py-4 text-[11px]"
                      style={{ fontFamily: "var(--font-pixel)", color: "#808080" }}
                    >
                      No messages yet. Be the first!
                    </div>
                  ) : (
                    messages.map((msg) => (
                      <div
                        key={msg.id}
                        className="mb-1"
                        style={{ lineHeight: "1.4" }}
                      >
                        <span
                          className="text-[11px] font-bold"
                          style={{ 
                            fontFamily: "var(--font-pixel)", 
                            color: getColorForUsername(msg.username),
                          }}
                        >
                          {msg.username}
                        </span>
                        <span
                          className="text-[11px]"
                          style={{ fontFamily: "var(--font-pixel)", color: "#000" }}
                        >
                          : {msg.message}
                        </span>
                      </div>
                    ))
                  )}
                </div>
              </Win95Scrollbar>
            </div>

            <div 
              className="px-1.5 py-1.5 relative z-10"
              style={{ backgroundColor: "#C0C0C0" }}
            >
              {!hasSetUsername ? (
                <div className="flex gap-1 items-center">
                  <span
                    className="text-[10px]"
                    style={{ fontFamily: "var(--font-pixel)", color: "#000" }}
                  >
                    Your name:
                  </span>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Enter your name..."
                    maxLength={20}
                    className="flex-1 px-2 py-1 text-[11px]"
                    style={{
                      backgroundColor: "#FFFEF0",
                      borderTop: "2px solid #808080",
                      borderLeft: "2px solid #808080",
                      borderBottom: "2px solid #fff",
                      borderRight: "2px solid #fff",
                      fontFamily: "var(--font-pixel)",
                      color: "#000",
                      outline: "none",
                    }}
                    data-testid="input-guestbook-username"
                  />
                  <button
                    onClick={() => {
                      if (username.trim()) setHasSetUsername(true);
                    }}
                    className="px-3 py-1 text-[10px]"
                    style={{
                      backgroundColor: "#C0C0C0",
                      borderTop: "2px solid #fff",
                      borderLeft: "2px solid #fff",
                      borderBottom: "2px solid #808080",
                      borderRight: "2px solid #808080",
                      fontFamily: "var(--font-pixel)",
                      color: "#000",
                    }}
                    data-testid="button-set-username"
                  >
                    OK
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <span
                      className="text-[10px] font-bold"
                      style={{
                        color: getColorForUsername(username),
                        fontFamily: "var(--font-pixel)",
                      }}
                    >
                      {username}
                    </span>
                    <button
                      onClick={() => setHasSetUsername(false)}
                      className="text-[8px] px-1"
                      style={{
                        backgroundColor: "#C0C0C0",
                        borderTop: "1px solid #fff",
                        borderLeft: "1px solid #fff",
                        borderBottom: "1px solid #808080",
                        borderRight: "1px solid #808080",
                        fontFamily: "var(--font-pixel)",
                        color: "#000",
                      }}
                      data-testid="button-change-username"
                    >
                      change
                    </button>
                    <button
                      onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                      className="text-[9px] px-1"
                      style={{
                        backgroundColor: "#FFFF00",
                        borderTop: "1px solid #fff",
                        borderLeft: "1px solid #fff",
                        borderBottom: "1px solid #808080",
                        borderRight: "1px solid #808080",
                        fontFamily: "var(--font-pixel)",
                        color: "#000",
                      }}
                      data-testid="button-emoji-picker"
                    >
                      :-)
                    </button>
                  </div>
                  <div className="flex gap-1 items-end relative">
                    <input
                      ref={messageInputRef}
                      type="text"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="Type a message..."
                      maxLength={200}
                      className="flex-1 px-2 py-1 text-[11px]"
                      style={{
                        backgroundColor: "#FFFEF0",
                        borderTop: "2px solid #808080",
                        borderLeft: "2px solid #808080",
                        borderBottom: "2px solid #fff",
                        borderRight: "2px solid #fff",
                        fontFamily: "var(--font-pixel)",
                        color: "#000",
                        outline: "none",
                      }}
                      data-testid="input-guestbook-message"
                    />
                    <button
                      onClick={handleSend}
                      disabled={createMutation.isPending || !message.trim()}
                      className="px-3 py-1 text-[10px]"
                      style={{
                        backgroundColor: "#C0C0C0",
                        borderTop: "2px solid #fff",
                        borderLeft: "2px solid #fff",
                        borderBottom: "2px solid #808080",
                        borderRight: "2px solid #808080",
                        fontFamily: "var(--font-pixel)",
                        color: "#000",
                        opacity: createMutation.isPending || !message.trim() ? 0.5 : 1,
                      }}
                      data-testid="button-send-message"
                    >
                      Send
                    </button>

                    <AnimatePresence>
                      {showEmojiPicker && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          className="absolute bottom-8 left-0"
                          style={{
                            backgroundColor: "#C0C0C0",
                            borderTop: "2px solid #fff",
                            borderLeft: "2px solid #fff",
                            borderBottom: "2px solid #808080",
                            borderRight: "2px solid #808080",
                            zIndex: 100,
                          }}
                        >
                          <div className="flex items-center justify-between px-1 py-0.5"
                            style={{
                              background: "linear-gradient(to right, #000080, #1084d0)",
                            }}
                          >
                            <span className="text-[8px] text-white" style={{ fontFamily: "var(--font-pixel)" }}>
                              Emojis
                            </span>
                            <button
                              onClick={() => setShowEmojiPicker(false)}
                              className="w-4 h-3 flex items-center justify-center text-[8px]"
                              style={{
                                backgroundColor: "#C0C0C0",
                                borderTop: "1px solid #fff",
                                borderLeft: "1px solid #fff",
                                borderBottom: "1px solid #808080",
                                borderRight: "1px solid #808080",
                                fontFamily: "var(--font-pixel)",
                                color: "#000",
                              }}
                              data-testid="button-close-emoji-picker"
                            >
                              X
                            </button>
                          </div>
                          <div 
                            style={{ 
                              height: "120px",
                              borderTop: "2px solid #808080",
                              borderLeft: "2px solid #808080",
                              borderBottom: "2px solid #fff",
                              borderRight: "2px solid #fff",
                              backgroundColor: "#fff",
                            }}
                          >
                            <Win95Scrollbar>
                              <div className="p-1.5 grid grid-cols-4 gap-1">
                                {WIN95_EMOJIS.map((item) => (
                                  <button
                                    key={item.label}
                                    onClick={() => insertEmoji(item.emoji)}
                                    className="px-1 h-7 flex items-center justify-center text-[9px] hover:bg-[#000080] hover:text-white whitespace-nowrap"
                                    style={{
                                      backgroundColor: "#fff",
                                      borderTop: "1px solid #808080",
                                      borderLeft: "1px solid #808080",
                                      borderBottom: "1px solid #fff",
                                      borderRight: "1px solid #fff",
                                      fontFamily: "var(--font-pixel)",
                                      color: "#000",
                                      minWidth: "50px",
                                    }}
                                    title={item.label}
                                    data-testid={`button-emoji-${item.label}`}
                                  >
                                    {item.emoji}
                                  </button>
                                ))}
                              </div>
                            </Win95Scrollbar>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              )}
            </div>

            <div
              className="flex items-center justify-between px-1 py-0.5 text-[8px] relative z-10"
              style={{
                backgroundColor: "#C0C0C0",
                borderTop: "1px solid #808080",
                fontFamily: "var(--font-pixel)",
                color: "#000",
              }}
            >
              <span>{messages.length} message{messages.length !== 1 ? "s" : ""}</span>
              <span style={{ color: error ? "#ff0000" : "#000" }}>
                {error || "Leave a message!"}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
