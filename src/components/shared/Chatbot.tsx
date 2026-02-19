"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BsChatText, BsSend, BsX } from "react-icons/bs";

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { text: "Hi! I'm Nikhil's virtual assistant. How can I help you today?", isBot: true },
    ]);
    const [input, setInput] = useState("");

    const handleSend = () => {
        if (!input.trim()) return;

        // Add user message
        setMessages((prev) => [...prev, { text: input, isBot: false }]);
        setInput("");

        // Simulate bot typing & reply (just UI for now)
        setTimeout(() => {
            setMessages((prev) => [
                ...prev,
                { text: "Thanks for the message! Since I'm just a UI preview right now, I can't really reply yet. Feel free to use the Contact section!", isBot: true },
            ]);
        }, 1000);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            handleSend();
        }
    };

    return (
        <>
            <AnimatePresence>
                {!isOpen && (
                    <motion.button
                        onClick={() => setIsOpen(true)}
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.5, y: 20 }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="fixed bottom-6 right-6 z-50 p-4 bg-primary text-primary-foreground rounded-full shadow-lg hover:shadow-xl transition-shadow flex items-center justify-center"
                    >
                        <BsChatText className="w-6 h-6" />
                    </motion.button>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 50, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 50, scale: 0.9 }}
                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                        className="fixed bottom-6 right-6 z-50 w-[90vw] sm:w-[380px] h-[500px] max-h-[85vh] bg-background border border-border/50 rounded-2xl shadow-2xl flex flex-col overflow-hidden origin-bottom-right"
                    >
                        {/* Header */}
                        <div className="bg-primary p-4 flex items-center justify-between text-primary-foreground">
                            <div className="flex items-center space-x-3">
                                <div className="relative">
                                    <div className="w-8 h-8 bg-primary-foreground/20 rounded-full flex items-center justify-center">
                                        <span className="font-bold text-sm">N</span>
                                    </div>
                                    <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-400 border-2 border-primary rounded-full"></div>
                                </div>
                                <div>
                                    <h3 className="font-bold text-sm leading-tight">Niks Bot</h3>
                                    <p className="text-xs opacity-80">Online</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="p-1 hover:bg-primary-foreground/20 rounded-lg transition-colors"
                                aria-label="Close chat"
                            >
                                <BsX className="w-6 h-6" />
                            </button>
                        </div>

                        {/* Messages Area */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-muted/30">
                            {messages.map((msg, index) => (
                                <div
                                    key={index}
                                    className={`flex ${msg.isBot ? "justify-start" : "justify-end"}`}
                                >
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.8, y: 10 }}
                                        animate={{ opacity: 1, scale: 1, y: 0 }}
                                        className={`max-w-[80%] rounded-2xl px-4 py-2 text-sm shadow-sm ${msg.isBot
                                                ? "bg-muted text-foreground rounded-tl-none border border-border/50"
                                                : "bg-primary text-primary-foreground rounded-tr-none"
                                            }`}
                                    >
                                        {msg.text}
                                    </motion.div>
                                </div>
                            ))}
                        </div>

                        {/* Input Area */}
                        <div className="p-3 bg-background border-t border-border/50">
                            <div className="flex items-center space-x-2 bg-muted rounded-xl px-3 py-2 border border-border/50 focus-within:ring-1 focus-within:ring-primary/50 focus-within:border-primary/50 transition-all">
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                    placeholder="Type a message..."
                                    className="flex-1 bg-transparent border-none focus:outline-none text-sm text-foreground placeholder:text-muted-foreground"
                                />
                                <button
                                    onClick={handleSend}
                                    disabled={!input.trim()}
                                    className="p-2 text-primary hover:bg-primary/10 rounded-lg transition-colors disabled:opacity-50 disabled:hover:bg-transparent"
                                >
                                    <BsSend className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Chatbot;
