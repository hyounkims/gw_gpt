import React, { useState, useRef, useEffect } from 'react';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonFooter,
  IonTextarea,
  IonButton,
  IonIcon,
  IonSpinner,
  IonButtons,
} from '@ionic/react';
import { send, trash } from 'ionicons/icons';
import { useChatStore } from '../store/chatStore';
import { chatService } from '../services/chatService';
import ReactMarkdown from 'react-markdown';
import './ChatTab.css';

const ChatTab: React.FC = () => {
  const { messages, isLoading, addMessage, clearMessages, setLoading } = useChatStore();
  const [inputText, setInputText] = useState('');
  const contentRef = useRef<HTMLIonContentElement>(null);

  // 메시지 추가 시 자동 스크롤
  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollToBottom(300);
    }
  }, [messages]);

  const handleSend = async () => {
    if (!inputText.trim() || isLoading) return;

    const userMessage = inputText.trim();
    setInputText('');

    // 사용자 메시지 추가
    addMessage('user', userMessage);
    setLoading(true);

    try {
      // API 요청
      const response = await chatService.sendMessage({
        messages: [
          ...messages.map((msg) => ({
            role: msg.role,
            content: msg.content,
          })),
          { role: 'user', content: userMessage },
        ],
        model: 'gpt-4',
        max_tokens: 2000,
      });

      // AI 응답 추가
      addMessage('assistant', response.message);
    } catch (error) {
      console.error('Chat error:', error);
      addMessage('assistant', '죄송합니다. 오류가 발생했습니다. 다시 시도해주세요.');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: any) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>AI Chat</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={clearMessages}>
              <IonIcon icon={trash} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent ref={contentRef} className="chat-content">
        <div className="messages-container">
          {messages.length === 0 && (
            <div className="empty-state">
              <h2>AI와 대화를 시작하세요</h2>
              <p>무엇이든 물어보세요!</p>
            </div>
          )}

          {messages.map((message) => (
            <div
              key={message.id}
              className={`message-wrapper ${
                message.role === 'user' ? 'user-message' : 'ai-message'
              }`}
            >
              <div className="message-bubble">
                <div className="message-header">
                  <strong>{message.role === 'user' ? 'You' : 'AI'}</strong>
                  <span className="message-time">
                    {new Date(message.timestamp).toLocaleTimeString('ko-KR', {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>
                </div>
                <div className="message-content">
                  {message.role === 'assistant' ? (
                    <ReactMarkdown>{message.content}</ReactMarkdown>
                  ) : (
                    <p>{message.content}</p>
                  )}
                </div>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="message-wrapper ai-message">
              <div className="message-bubble">
                <div className="loading-indicator">
                  <IonSpinner name="dots" />
                  <span>AI가 생각 중...</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </IonContent>

      <IonFooter className="chat-footer">
        <div className="input-container">
          <IonTextarea
            value={inputText}
            onIonInput={(e) => setInputText(e.detail.value || '')}
            placeholder="메시지를 입력하세요..."
            autoGrow
            rows={1}
            maxlength={2000}
            disabled={isLoading}
            onKeyDown={handleKeyPress}
            className="chat-input"
          />
          <IonButton
            onClick={handleSend}
            disabled={!inputText.trim() || isLoading}
            className="send-button"
          >
            <IonIcon icon={send} />
          </IonButton>
        </div>
      </IonFooter>
    </IonPage>
  );
};

export default ChatTab;
