module.exports = {
  build: {
    preview: {
      android: {
        buildType: "apk",
      },
      env: {
        EXPO_PUBLIC_URL_BACKEND:
          "https://expense-record-production.up.railway.app/api",
        EXPO_PUBLIC_ANDROID_CLIENT_ID:
          "440036428069-sqko1un37nvkki6vm0uo1oe50bjcmc59.apps.googleusercontent.com",
        EXPO_PUBLIC_GOOGLE_SERVICES_JSON: "google-services.json",
      },
    },
    development: {
      android: {
        buildType: "apk",
        userInterfaceStyle: "automatic",
      },
      env: {
        EXPO_PUBLIC_URL_BACKEND:
          "https://expense-record-production.up.railway.app/api",
        EXPO_PUBLIC_ANDROID_CLIENT_ID:
          "440036428069-sqko1un37nvkki6vm0uo1oe50bjcmc59.apps.googleusercontent.com",
        EXPO_PUBLIC_GOOGLE_SERVICES_JSON: "google-services.json",
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
      }
    },
  },
  android: {
    userInterfaceStyle: "automatic",
    adaptiveIcon: {
      foregroundImage: "./assets/dark_adaptive_icon.png",
      backgroundColor: "#000000",
    },
    package: "com.maximilianoborrajo.expenserecordmobile",
  },
  expo: {
    name: "Fehu: Expense Tracker",
    slug: "expense-record-mobile",
    scheme: "expenserecordmobile",
    icon: "./assets/dark_icon.png",
    userInterfaceStyle: "automatic",
    splash: {
      image: "./assets/dark_splash.png",
      resizeMode: "cover",
      backgroundColor: "#000000",
    },
    extra: {
      eas: {
        projectId: "0854aae1-2b3d-4d3d-a448-00b41c05b3f0",
      },
    },
    notification: {
      icon: "./assets/dark_icon.png",
      color: "#242528",
    },
    android: {
      userInterfaceStyle: "automatic",
      adaptiveIcon: {
        foregroundImage: "./assets/dark_adaptive_icon.png",
        backgroundColor: "#000000",
      },
      package: "com.maximilianoborrajo.expenserecordmobile",
    },
  },
};
