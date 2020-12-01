module.exports = {
  presets: [
    ['@babel/preset-env', { targets: { node: 'current' } }]
  ],
  plugins: [
    ['module-resolver', {
      alias: {
        "@infra": "./src/infra",
        "@middleware": "./src/middleware",
        "@modules": "./src/modules",
        "@util": "./src/util"
      }
    }],
    ['@babel/plugin-proposal-decorators', { "legacy": true }],
    ['@babel/plugin-proposal-class-properties', { "loose": true }],
  ],
}