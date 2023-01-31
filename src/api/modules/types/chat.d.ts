export declare interface ApplyForm {
  friendUid: string;
  verifyMsg: string;
}

export declare interface ChatRecordForm {
  chatId: number;
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
  isSelf: boolean;
  avatar: string;
  [x: string]: any;
}

export declare interface ChatRecordResponse {
  current: number;
  pageSize: number;
  pages: number;
  total: number;
  time: number;
  data: ChatRecordItem[];
}

export declare interface ContactItem {
  chatId: number;
  contactId: number;
  contactName: string;
  createdAt: string;
  friendUid: string;
  groupId: number;
  remark: string;
  type: number;
  updatedAt: string;
}
