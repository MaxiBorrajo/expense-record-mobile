module.exports = {
  build: {
    preview: {
      android: {
        buildType: "apk",
      },
    },
    development: {
      android: {
        buildType: "apk",
      },
    },
    preview2: {
      android: {
        gradleCommand: ":app:assembleRelease",
      },
    },
    preview3: {
      developmentClient: true,
    },
    preview4: {
      distribution: "internal",
    },
    production: {
      env: {
        EXPO_PUBLIC_URL_BACKEND:
          "https://expense-record-production.up.railway.app/api",
        EXPO_PUBLIC_ANDROID_CLIENT_ID:
          "440036428069-sqko1un37nvkki6vm0uo1oe50bjcmc59.apps.googleusercontent.com",
        EXPO_PUBLIC_GOOGLE_SERVICES_JSON: "google-services.json",
      },
    },
  },
  android: {
    package: "com.maximilianoborrajo.expenserecordmobile",
  },
  expo: {
    scheme: "expenserecordmobile",
    extra: {
      eas: {
        projectId: "0854aae1-2b3d-4d3d-a448-00b41c05b3f0",
      },
    },
    notification: {
      icon: "./assets/dark_icon.png",
      color: "#242528",
      sounds: ["./assets/notification.wav"],
      mode: "production",
    },
    android: {
      package: "com.maximilianoborrajo.expenserecordmobile",
    },
  },
};
