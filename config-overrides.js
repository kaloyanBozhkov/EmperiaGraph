const path = require('path')

module.exports = (config, env) => {
  config.resolve = {
    alias: {
      '~': path.resolve(__dirname, 'src'),
      scss: path.resolve(__dirname, 'src/scss'),
      mixins: path.resolve(__dirname, 'src/scss/mixins.scss'),
      variables: path.resolve(__dirname, 'src/scss/variables.scss'),
      keyframes: path.resolve(__dirname, 'src/scss/keyframes.scss'),
      'UI': path.resolve(__dirname, 'src/components/UI')
    },
  }

  return config
}
