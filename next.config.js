module.exports = {
  env: {
    ICON_URL: "/static/assets/icons",
  },
  webpackDevMiddleware: config => {
    config.watchOptions = {
      poll: 1000,
      aggregateTimeout: 300,
    }
    return config
  },
};
