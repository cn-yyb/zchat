import type { SERVER_EVENTS } from './setting';

export interface WSMsgType {
  event: SERVER_EVENTS;
  data: any;
  time?: string;
}
