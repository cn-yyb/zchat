/**
 * Configure and register global directives
 */
import type { App } from 'vue';
import RippleDirective from '@/directives/ripple';
import LongPressDirective from '@/directives/longpress';

export function setupGlobDirectives(app: App) {
  app.directive('ripple', RippleDirective);
  app.directive('long-press', LongPressDirective);
}
