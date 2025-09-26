// components/ChainbotPopup.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import useChainbot from "@/hooks/useChainbot"; // Ensure this path is correct

// SVG icon for the chat bubble
const ChatIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
  </svg>
);

// SVG icon for the close button
const CloseIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

export function ChainbotPopup() {
  const [isOpen, setIsOpen] = useState(false);

  // Your existing Chainbot logic
  const { messages, input, setInput, loading, error, handleSend } = useChainbot(
    [
      {
        role: "bot",
        content:
          "Hello! I'm Chainbot, your assistant for managing blockchain interactions. How can I assist you today?",
      },
    ]
  );

  const scrollAreaRef = useRef<HTMLDivElement>(null);

  // Automatically scroll to the bottom when a new message is added
  useEffect(() => {
    if (scrollAreaRef.current) {
      const viewport = scrollAreaRef.current.querySelector(
        "div[data-radix-scroll-area-viewport]"
      );
      if (viewport) {
        viewport.scrollTop = viewport.scrollHeight;
      }
    }
  }, [messages, loading]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      handleSend();
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {/* Chat Popup Window */}
      {isOpen && (
        <Card className="w-80 h-[450px] shadow-xl flex flex-col animate-in slide-in-from-bottom-5 fade-in-20">
          <CardHeader className="flex flex-row items-center justify-between p-4 border-b">
            <CardTitle className="text-lg">Chainbot</CardTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleChat}
              className="h-8 w-8"
            >
              <CloseIcon />
              <span className="sr-only">Close chat</span>
            </Button>
          </CardHeader>

          <CardContent className="flex-1 p-2 overflow-y-auto">
            <ScrollArea className="h-full w-full pr-4" ref={scrollAreaRef}>
              <div className="p-2">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${
                      message.role === "user" ? "justify-end" : "justify-start"
                    } mb-3`}
                  >
                    <div
                      className={`rounded-lg p-2 max-w-[85%] text-sm break-words ${
                        message.role === "user"
                          ? "bg-primary text-primary-foreground"
                          : "bg-secondary"
                      }`}
                    >
                      {message.content}
                    </div>
                  </div>
                ))}
                {loading && (
                  <div className="flex justify-start">
                    <div className="rounded-lg p-2 bg-secondary">
                      <div className="flex items-center gap-1.5">
                        <span className="h-2 w-2 rounded-full bg-muted-foreground animate-bounce [animation-delay:-0.3s]"></span>
                        <span className="h-2 w-2 rounded-full bg-muted-foreground animate-bounce [animation-delay:-0.15s]"></span>
                        <span className="h-2 w-2 rounded-full bg-muted-foreground animate-bounce"></span>
                      </div>
                    </div>
                  </div>
                )}
                {error && (
                  <div className="flex justify-start mb-4">
                    <div className="rounded-lg p-2 max-w-[85%] bg-destructive text-destructive-foreground text-sm">
                      {error}
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>
          </CardContent>

          <div className="p-2 border-t bg-muted/50">
            <form onSubmit={handleSubmit} className="flex w-full space-x-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                className="flex-1"
              />
              <Button type="submit" disabled={loading}>
                Send
              </Button>
            </form>
          </div>
        </Card>
      )}

      {/* Toggle Button */}
      {!isOpen && (
        <Button
          onClick={toggleChat}
          className="rounded-full w-14 h-14 shadow-lg flex items-center justify-center animate-in zoom-in-50"
        >
          <ChatIcon />
          <span className="sr-only">Open chat</span>
        </Button>
      )}
    </div>
  );
}
