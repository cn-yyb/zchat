/*
 * @Author: zq
 * @Date: 2023-01-12 16:15:33
 * @Last Modified by: zq
 * @Last Modified time: 2023-02-06 09:24:25
 */

import type { ErrorMessageMode } from '#/axios';
import { http } from '../config';

enum Api {
  APPLY = '/chat/apply',
  APPLY_PASS = '/chat/apply/pass',
  CONTACTS = '/chat/contacts',
  RECORD = '/chat/record',
  CONTACT_GROUPS = '/chat/contact-groups',
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
      url: Api.RECORD,
      data,
    },
    {
      errorMessageMode: mode,
    },
  );
}

/**
 * @description: get contact groups
 */
export function getContactGroups(params = {}, mode: ErrorMessageMode = 'notify') {
  return http.get<ContactGroupItem[]>(
    {
      url: Api.CONTACT_GROUPS,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}
