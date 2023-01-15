export declare interface ApplyForm {
  friendUid: string;
  verifyMsg: string;
}

export declare interface ChatRecordForm {
  chatId: string;
  current?: number;
  pageSize?: number;
}

export declare interface ChatRecordItem {
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

export declare interface ChatRecordResponse {
  current: number;
  pageSize: number;
  pages: number;
  total: number;
  time: number;
  data: ChatRecordItem[];
}
