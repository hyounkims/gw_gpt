import { api } from './api';
import { ChatRequest, ChatResponse } from '../types';

export const chatService = {
  // 채팅 메시지 전송
  async sendMessage(request: ChatRequest): Promise<ChatResponse> {
    const { data } = await api.post<ChatResponse>('/api/chat', request);
    return data;
  },

  // 헬스 체크
  async healthCheck(): Promise<boolean> {
    try {
      const { data } = await api.get('/api/health');
      return data.status === 'healthy';
    } catch {
      return false;
    }
  },
};
