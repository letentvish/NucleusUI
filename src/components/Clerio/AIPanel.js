"use client";
import React from 'react';
import { Send, Paperclip, Sparkles, X } from 'lucide-react';
import styles from './AIPanel.module.css';

const AIPanel = ({ onClose, onNavigate }) => {
    const [messages, setMessages] = React.useState([
        { id: 1, text: "Hello! I'm your HR Assistant. How can I help you today?", sender: 'bot', time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
    ]);
    const [inputValue, setInputValue] = React.useState('');
    const [isTyping, setIsTyping] = React.useState(false);
    const messagesEndRef = React.useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    React.useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    const handleSend = async () => {
        if (!inputValue.trim()) return;

        const userMsg = {
            id: Date.now(),
            text: inputValue,
            sender: 'user',
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        setMessages(prev => [...prev, userMsg]);
        setInputValue('');
        setIsTyping(true);

        try {
            const response = await fetch('/api/agent', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: userMsg.text })
            });
            const data = await response.json();

            setIsTyping(false);

            const botMsg = {
                id: Date.now() + 1,
                text: data.reply,
                sender: 'bot',
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            };
            setMessages(prev => [...prev, botMsg]);

            if (data.action && data.action.type === 'NAVIGATE' && onNavigate) {
                onNavigate(data.action.payload);
            }

        } catch (error) {
            console.error(error);
            setIsTyping(false);
            setMessages(prev => [...prev, {
                id: Date.now() + 1,
                text: "Sorry, I'm having trouble connecting right now.",
                sender: 'bot',
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            }]);
        }
    };

    return (
        <div className={styles.panel}>
            <div className={styles.header}>
                <h3>
                    <Sparkles size={16} />
                    AI Assistant
                </h3>
                <div className={styles.headerActions}>
                    <button className={styles.actionIcon}>⤢</button>
                    {/* Close Button */}
                    <button
                        className={styles.actionIcon}
                        onClick={onClose}
                        title="Close Panel"
                    >
                        <X size={18} />
                    </button>
                </div>
            </div>

            <div className={styles.chatHistory}>
                {messages.map(msg => (
                    <div key={msg.id} className={`${styles.messageGroup} ${msg.sender === 'user' ? styles.user : ''}`}>
                        {msg.sender === 'bot' && (
                            <img
                                src="https://ui-avatars.com/api/?name=AI&background=000&color=fff"
                                className={styles.botAvatar}
                                alt="AI"
                            />
                        )}
                        <div className={msg.sender === 'bot' ? styles.botBubble : styles.userBubble}>
                            <p>{msg.text}</p>
                            <span className={styles.time}>{msg.time}</span>
                        </div>
                        {msg.sender === 'user' && (
                            <img
                                src="https://ui-avatars.com/api/?name=User&background=2563ea&color=fff"
                                className={styles.userAvatar}
                                alt="User"
                            />
                        )}
                    </div>
                ))}

                {isTyping && (
                    <div className={styles.messageGroup}>
                        <img src="https://ui-avatars.com/api/?name=AI&background=000&color=fff" className={styles.botAvatar} alt="AI" />
                        <div className={styles.botBubble}>
                            <p>Typing...</p>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            <div className={styles.footer}>
                <div className={styles.tabs}>
                    <button className={`${styles.tab} ${styles.active}`}>HR Assistant</button>
                    <button className={styles.tab}>Policy Guide</button>
                    <button className={styles.tab}>Analytics</button>
                </div>

                <div className={styles.inputBar}>
                    <button className={styles.attachBtn}><Paperclip size={18} /></button>
                    <input
                        type="text"
                        placeholder="Type your HR request..."
                        className={styles.input}
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    />
                    <button className={styles.sendBtn} onClick={handleSend}><Send size={16} /></button>
                </div>
            </div>
        </div>
    );
};

export default AIPanel;
