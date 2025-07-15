import { useState } from "react"
import { Send, User } from "lucide-react"
import "./Chat.css"
import 'react-chat-elements/dist/main.css';

interface Message {
    role: 'user' | 'assistant';
    content: string;
}

const Chat = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isTyping, setIsTyping] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const userMessage: Message = {
            role: 'user',
            content: input
        };

        // ユーザーメッセージを即座に表示
        const updatedMessages = [...messages, userMessage];
        setMessages(updatedMessages);
        setInput('');
        setIsLoading(true);
        setIsTyping(true);

        try {
            const response = await fetch('http://localhost:8080/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ messages: updatedMessages }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            
            const assistantMessage: Message = {
                role: 'assistant',
                content: data.content
            };

            // アシスタントの応答を追加
            setMessages(prev => [...prev, assistantMessage]);
        } catch (error) {
            console.error('Error sending message:', error);
            
            // エラーメッセージを表示
            const errorMessage: Message = {
                role: 'assistant',
                content: 'Sorry, I encountered an error while processing your message. Please try again.'
            };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
            setIsTyping(false);
        }
    };

    return (
        <div className="chat-container">
            {/* Header */}
            <div className="chat-header">
                <div className="chat-header-content">
                    <h1 className="chat-title">alain chat</h1>
                </div>
            </div>

            {/* Chat Container */}
            <div className="chat-main">
                <div className="chat-card">
                    {/* Messages Area */}
                    <div className="messages-area">
                        {messages.length === 0 && !isLoading && (
                            <div className="welcome-section">
                                <div className="welcome-avatar">
                                    <img src="/alain-avatar.png" alt="Alain" width={96} height={96} />
                                </div>
                                <h2 className="welcome-title">Hello, I'm Alain</h2>
                                <p className="welcome-subtitle">哲学者アランに悩みを相談しましょう</p>
                            </div>
                        )}

                        {messages.map((message, index) => (
                            <div key={index} className={`message-row ${message.role}`}>
                                {message.role === "assistant" && (
                                    <div className="message-avatar">
                                        <img src="/alain-avatar.png" alt="Alain" width={32} height={32} />
                                    </div>
                                )}

                                <div className={`message-bubble ${message.role}`}>
                                    <p className="message-text">{message.content}</p>
                                </div>

                                {message.role === "user" && (
                                    <div className="user-avatar">
                                        <User />
                                    </div>
                                )}
                            </div>
                        ))}

                        {isLoading && isTyping && (
                            <div className="typing-indicator">
                                <div className="message-avatar">
                                    <img src="/alain-avatar.png" alt="Alain" width={32} height={32} />
                                </div>
                                <div className="typing-bubble">
                                    <div className="typing-dots">
                                        <div className="typing-dot"></div>
                                        <div className="typing-dot"></div>
                                        <div className="typing-dot"></div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Input Area */}
                    <div className="input-area">
                        <form onSubmit={handleSubmit} className="input-form">
                            <input
                                type="text"
                                value={input}
                                onChange={handleInputChange}
                                placeholder="Type your message..."
                                className="input-field"
                                disabled={isLoading}
                            />
                            <button type="submit" disabled={isLoading || !input.trim()} className="send-button">
                                <Send />
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Chat;