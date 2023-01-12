declare interface ApplyForm {
  friendUid: string;
  verifyMsg: string;
}

declare interface ChatRecordForm {
  chatId: string;
  current?: number;
  pageSize?: number;
}

declare interface ChatRecordItem {
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

declare interface ChatRecordResponse {
  current: number;
  pageSize: number;
  pages: number;
  total: number;
  time: number;
  data: ChatRecordItem[];
}
