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

declare interface ChatRoomTypes {
  chatId: number;
  type: number;
  chatRoomName?: string;
  contactId: number;
  userStatus: number;
  isOnline: boolean;
  [x: string]: any;
}

declare interface ChatRecordListItem {
  senderId: string;
  chatId: number;
  content: string;
  total: number;
  time: string;
  isRead: boolean;
  user: chatRecordResItem['user'];
}

declare type listenerCb<T = any> = (res?: WSMsgType<T>) => void;
