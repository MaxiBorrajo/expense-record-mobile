module.exports = ({ config }) => {
  return {
    ...config,
    "react-native-google-mobile-ads": {
      android_app_id: process.env.EXPO_PUBLIC_APP_ADD,
    },
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
      production: {},
    },
  };
};
