import type { AxiosResponseHeaders } from 'axios';

/**
 * 文件统一导出
 * @param data 响应体数据
 * @param headers 响应头数据
 */
export default function fileExport(data: BlobPart, headers: AxiosResponseHeaders) {
  const blob = new Blob([data]);
  const fileName =
    decodeURIComponent(headers?.filename as string) ||
    decodeURIComponent((headers?.['content-disposition'] as string).split('filename=')[1]) ||
    `file_${Date.now()}`;
  if ('download' in document.createElement('a')) {
    // 非IE下载
    const elink = document.createElement('a');
    elink.download = fileName;
    elink.style.display = 'none';
    elink.href = URL.createObjectURL(blob);
    document.body.appendChild(elink);
    elink.click();
    URL.revokeObjectURL(elink.href); // 释放URL 对象
    document.body.removeChild(elink);
  } else {
    // IE10+下载
    // @ts-ignore
    navigator.msSaveBlob && navigator.msSaveBlob(blob, fileName);
  }
}
