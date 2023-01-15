import type { App } from 'vue';
import { createPinia } from 'pinia';

export * from './modules/app';
export * from './modules/counter';
export * from './modules/routeCache';
export * from './modules/websocket';

const store = createPinia();

export function setupStore(app: App<Element>) {
  app.use(store);
}

export { store };
