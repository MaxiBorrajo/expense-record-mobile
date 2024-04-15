module.exports = ({ config }) => {
  return {
    ...config,
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
       
      },
    },
  };
};
