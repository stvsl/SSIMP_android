import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'SSIMP_Android',
  webDir: 'dist',
  bundledWebRuntime: false,
   plugins: {
    CapacitorCookies: {
      enabled: true,
    },
  },
};

export default config;
