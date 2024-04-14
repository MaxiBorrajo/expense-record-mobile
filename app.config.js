module.exports = ({ config }) => {
  return {
    ...config,
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
          EXPO_PUBLIC_INTERSTIAL_ADD: "ca-app-pub-5123415331806704/4902166173",
          EXPO_PUBLIC_BANNER_ADD: "ca-app-pub-5123415331806704/1202594317",
          EXPO_PUBLIC_APP_ADD: "ca-app-pub-5123415331806704~3076080624",
        },
      },
      development: {
        android: {
          buildType: "apk",
        },
        env: {
          EXPO_PUBLIC_URL_BACKEND:
            "https://expense-record-production.up.railway.app/api",
          EXPO_PUBLIC_ANDROID_CLIENT_ID:
            "440036428069-sqko1un37nvkki6vm0uo1oe50bjcmc59.apps.googleusercontent.com",
          EXPO_PUBLIC_GOOGLE_SERVICES_JSON: "google-services.json",
          EXPO_PUBLIC_INTERSTIAL_ADD: "ca-app-pub-5123415331806704/4902166173",
          EXPO_PUBLIC_BANNER_ADD: "ca-app-pub-5123415331806704/1202594317",
          EXPO_PUBLIC_APP_ADD: "ca-app-pub-5123415331806704~3076080624",
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
          EXPO_PUBLIC_INTERSTIAL_ADD: "ca-app-pub-5123415331806704/4902166173",
          EXPO_PUBLIC_BANNER_ADD: "ca-app-pub-5123415331806704/1202594317",
          EXPO_PUBLIC_APP_ADD: "ca-app-pub-5123415331806704~3076080624",
        },
      },
    },
  };
};
