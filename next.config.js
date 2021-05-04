module.exports = {
  publicRuntimeConfig: {
    NEXT_GOOGLE_SIGN_IN: process.env.GOOGLE_SIGN_IN,
    NEXT_IMGUR_ALBUM_ID: process.env.IMGUR_ALBUM_ID,
    NEXT_IMGUR_ACCESS_TOKEN: process.env.IMGUR_ACCESS_TOKEN,
  },
  webpackDevMiddleware: config => {
    config.watchOptions = {
      poll: 1000,
      aggregateTimeout: 300,
    }
    return config
  },
};
