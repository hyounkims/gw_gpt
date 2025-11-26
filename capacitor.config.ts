import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.gwanak.gptapp',
  appName: 'Gwanak GPT',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
