/*
 * @Author: zq
 * @Date: 2022-12-02 09:59:08
 * @Last Modified by: zq
 * @Last Modified time: 2023-01-04 15:44:36
 */

export class WS_CONFIG {
  static readonly URL = 'ws://127.0.0.1:8001';
  static readonly PING_TIME = 30 * 1000;
}

// export const SERVER_EVENTS = {
//   S_PING: 'PING',
//   S_SEND_DATA: 'S_SEND_DATA',
// };

// export const CLIENT_EVENTS = {
//   C_PONG: 'C_PONG',
//   C_RECEIEMSG: 'C_RECEIEMSG',
// };

export enum SERVER_EVENTS {
  PING = 'SERVER_PING',
  SEND_DATA = ' SERVER_SEND_DATA',
}

export enum CLIENT_EVENTS {
  PONG = 'CLIENT_PONG',
  RECEIVE_DATA = 'CLIENT_RECEIVE_DATA',
}
