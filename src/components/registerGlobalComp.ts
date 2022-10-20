import { ConfigProvider } from 'vant';
import type { App } from 'vue';

// Toast
import 'vant/es/toast/style';

// Dialog
import 'vant/es/dialog/style';

// Notify
import 'vant/es/notify/style';

// ImagePreview
import 'vant/es/image-preview/style';

const components = [ConfigProvider];

export function registerGlobComp(app: App) {
  components.forEach((v) => app.use(v));
}
