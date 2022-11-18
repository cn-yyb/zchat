/**
 * Configure and register global directives
 */
import type { App } from 'vue';
import RippleDirective from '@/directives/ripple';

export function setupGlobDirectives(app: App) {
  app.directive('ripple', RippleDirective);
}
