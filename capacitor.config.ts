import { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.stvsljl.ssimp.employee",
  appName: "SSIMP",
  webDir: "dist",
  bundledWebRuntime: false,
  android: {
    buildOptions: {
      keystorePath: "/home/stvsl/Documents/apkmakekey.jks",
      keystoreAlias: "key0",
    },
  },
};

export default config;
