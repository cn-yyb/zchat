export interface ApplyForm {
  friendUid: string;
  verifyMsg: string;
}

export interface ChatRecordForm {
  chatId: string;
  current?: number;
  pageSize?: number;
}

export interface ChatRecordItem {
  msgId: number;
  senderId: string;
  receiverId: string;
  chatId: number;
  msgType: number;
  content: string;
  status: number;
  createdAt: string;
  updatedAt: string;
  isSelf: false;
}

export interface ChatRecordResponse {
  current: number;
  pageSize: number;
  pages: number;
  total: number;
  time: number;
  data: ChatRecordItem[];
}
