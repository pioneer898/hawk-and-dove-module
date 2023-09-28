module.exports = {
  entry: "./src/scenario.js",
  output: {
    filename: 'hawkanddove.js',
    libraryTarget: 'var',
    library: 'Scenario'
  },
  target: 'web',
  mode: 'production',
};