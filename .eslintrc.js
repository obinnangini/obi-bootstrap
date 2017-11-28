const config = {
  root: true,
  parserOptions: {
    sourceType: 'module'
  },
  extends: ['airbnb-base'],
  // check if imports actually resolve
  'settings': {
    'import/resolver': {
      'webpack': {
        'config': 'webpack.config.js'
      }
    },
  },
};

module.exports = config;
