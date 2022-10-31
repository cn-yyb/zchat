/**
 * * 处理文本溢出hook
 */
import { computed } from 'vue';

/**
 * 处理文本溢出hook
 * @param textLength 最大文本长度
 * @param ellipsisFlag 文本溢出符号
 * @returns textComputed 文本溢出溢出方法
 */
export default function useTextOverFlow(textLength: number, ellipsisFlag = '...') {
  function autoFix(textData: string, _textLength?: number, _ellipsisFlag?: string) {
    if (textData.length > textLength) {
      return textData.slice(0, _textLength || textLength) + (_ellipsisFlag || ellipsisFlag);
    } else {
      return textData;
    }
  }
  const textComputed = computed(() => autoFix);

  return { textComputed, autoFix };
}
