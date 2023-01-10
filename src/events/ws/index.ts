/*
 * @Author: zq
 * @Date: 2022-12-02 09:56:06
 * @Last Modified by: zq
 * @Last Modified time: 2023-01-04 16:01:31
 * 创建 websocket服务
 */

import { HeartCheck } from './helper';
import { WS_CONFIG } from './setting';
import type { WSMsgType } from './type';
import dayjs from 'dayjs';

export * from './type';
export * from './helper';
export * from './setting';

export interface WSConfig {
  url?: string;
  protocols?: string | string[];
}

export class WebSocketChannel {
  readonly heartCheck = new HeartCheck();
  private client: WebSocket | null = null;
  config: WSConfig = {
    url: WS_CONFIG.URL,
  };
  isConnected = false;
  reconnectCount = 0;

  get instance() {
    return this.client;
  }

  constructor(config: WSConfig = {}) {
    this.config = Object.assign(this.config, config);
  }

  initWebSocket() {
    return new Promise<any>((resolve, reject) => {
      // 初始化 websocket 实例
      this.client = new WebSocket(this.config.url!, this.config.protocols);

      // 初始化事件监听
      this.client.onopen = (e) => {
        this.onWebSocketOpen(e);
        resolve('websocket conneted successfully!');
      };

      // this.client.addEventListener('message', this.onWebSocketMessage);

      this.client.onclose = (e) => {
        reject(e);
        this.onWebSocketClose(e);
      };

      this.client.onerror = (e) => {
        reject(e);
        this.onWebSocketError(e);
      };
    });
  }

  private onWebSocketOpen(_e: Event) {
    console.warn('websocket is connected!');
    this.isConnected = true;
    this.reconnectCount = 0;
    this.client?.send(HeartCheck.createHeartMsg());
    this.heartCheck.start(this.isConnected, () => {
      this.client?.send(HeartCheck.createHeartMsg());
    });
  }

  // private onWebSocketMessage(e: Event) {
  //   console.log('msg: ', e);
  // }

  private onWebSocketClose(e: CloseEvent) {
    console.log('close: ', e);
    this.heartCheck.clear();
    this.isConnected = false;
    //被动断开，重新连接
    if (e.code === 1006) {
      this.destory();
      if (this.reconnectCount < 3) {
        setTimeout(() => {
          console.log('websocket reconnecting...', this.reconnectCount);
          this.initWebSocket();
          this.reconnectCount++;
        }, 3000);
      } else {
        console.error('websocket is disconnected!!');
      }
    }
  }

  private onWebSocketError(e: Event) {
    this.heartCheck.clear();
    this.isConnected = false;
    console.log('websocket connect error:', e);
  }

  sendMsg(msg: WSMsgType) {
    msg.data ??= dayjs().format('YYYY-MM-DD HH:mm:ss');
    switch (this.client?.readyState) {
      //CONNECTING：值为0，表示正在连接。
      case WebSocket.CONNECTING:
        setTimeout(() => {
          this.sendMsg(msg);
        }, 1000);
        break;
      //OPEN：值为1，表示连接成功，可以通信了。
      case WebSocket.OPEN:
        this.client?.send(JSON.stringify(msg));
        break;
      //CLOSING：值为2，表示连接正在关闭。
      case WebSocket.CLOSING:
        setTimeout(() => {
          this.sendMsg(msg);
        }, 1000);
        break;
      //CLOSED：值为3，表示连接已经关闭，或者打开连接失败。
      case WebSocket.CLOSED:
        // do something
        break;
      default:
        // this never happens
        break;
    }
  }

  close() {
    this.isConnected = false;
    this.reconnectCount = 0;
    this.client?.close();
    this.heartCheck?.clear();
    this.client = null;
  }

  destory() {
    this.client!.onclose = null;
    this.client!.onerror = null;
    this.client!.onmessage = null;
    this.client!.onopen = null;
    this.client = null;
  }
}
