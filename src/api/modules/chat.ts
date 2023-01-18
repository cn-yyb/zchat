/*
 * @Author: zq
 * @Date: 2023-01-12 16:15:33
 * @Last Modified by: zq
 * @Last Modified time: 2023-01-14 22:01:36
 */

import type { ErrorMessageMode } from '#/axios';
import { http } from '../config';
import type { ApplyForm, ChatRecordForm, ChatRecordResponse, ContactItem } from './types/chat';

enum Api {
  APPLY = '/chat/apply',
  APPLY_PASS = '/chat/apply/pass',
  CONTACTS = '/chat/contacts',
  RECORD = '/chat/record',
}

/**
 * @description: sendNewApplication
 */
export function sendNewApplication(data: ApplyForm, mode: ErrorMessageMode = 'notify') {
  return http.post<any>(
    {
      url: Api.APPLY,
      data,
    },
    {
      errorMessageMode: mode,
    },
  );
}

/**
 * @description: passApplication
 */
export function passApplication(data: { id: number }, mode: ErrorMessageMode = 'notify') {
  return http.post<any>(
    {
      url: Api.APPLY_PASS,
      data,
    },
    {
      errorMessageMode: mode,
    },
  );
}

/**
 * @description: getContacts
 */
export function getContacts(params = {}, mode: ErrorMessageMode = 'notify') {
  return http.get<ContactItem[]>(
    {
      url: Api.CONTACTS,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

/**
 * @description: get chat record
 */
export function getChatRecord(data: ChatRecordForm, mode: ErrorMessageMode = 'notify') {
  return http.post<ChatRecordResponse>(
    {
      url: Api.CONTACTS,
      data,
    },
    {
      errorMessageMode: mode,
    },
  );
}
