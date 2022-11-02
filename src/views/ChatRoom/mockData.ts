/*
 * @Author: zq
 * @Date: 2022-11-02 15:46:28
 * @Last Modified by: zq
 * @Last Modified time: 2022-11-02 16:45:40
 */
import { getCalendarDate } from '@/utils/calendarDate';
import dayjs from 'dayjs';

export interface ChatRecordItem {
  nickname: string;
  avatar: string;
  created_date: string;
  isEndTime: boolean;
  isSelf: boolean;
  content: string;
}

const chatContent = [
  '你吃饭了吗 ?',
  '你睡觉了吗 ?',
  '你几点中下班 ?',
  '会议文档发我一下',
  '在? 晚上几点钟开黑',
  '哈哈, 阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴',
  '项目git仓库地址: https://gitee.com/kula0410/api_server, 别忘了哈!',
  '我今天吃的猪脚饭',
  '我吃的沙县',
  '还早, 再玩一把就睡了',
];

export function getChatMockData(): ChatRecordItem[] {
  return Array(40)
    .fill(1)
    .map((_v, i) => ({
      nickname: 'username',
      avatar: 'https://fastly.jsdelivr.net/npm/@vant/assets/doge.png',
      created_date: getCalendarDate(dayjs(+new Date() + i * 20000).format('YYYY-MM-DD HH:mm:ss')),
      isEndTime: i % 5 === 0,
      isSelf: i % 3 === 0,
      content: chatContent[Math.floor(Math.random() * 10)],
    }));
}

// nickname: '一隅北';
// avatar: 'https://portrait.gitee.com/uploads/avatars/user/2794/8383972_kula0410_1644496006.png!avatar200';
// created_date: '2022='
