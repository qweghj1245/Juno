module.exports = {
  publicRuntimeConfig: {
    NEXT_GOOGLE_SIGN_IN: process.env.GOOGLE_SIGN_IN,
  },
  webpackDevMiddleware: config => {
    config.watchOptions = {
      poll: 1000,
      aggregateTimeout: 300,
    }
    return config
  },
};
