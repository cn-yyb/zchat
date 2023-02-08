declare interface chatRecordResItem {
  chatId: number;
  contactId: number;
  msgType: number;
  status: number;
  msgId: number;
  senderId: string;
  receiverId: string;
  content: string;
  updatedAt: string;
  createdAt: string;
  user: {
    avatar: string;
    uid: string;
    nickName: string;
    gender: number;
    accountName: string;
  };
}
