import type { SERVER_EVENTS } from './setting';

export interface WSMsgType {
  event: SERVER_EVENTS;
  data: string;
  time: string;
  meta?: object;
}
