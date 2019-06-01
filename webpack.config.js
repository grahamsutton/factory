module.exports = {
  mode: 'production',
  entry: './factory.js',
  output: {
    filename: 'factory.js',
    library: 'factory',
    libraryTarget: 'commonjs2'
  },
  performance: {
    hints: false
  }
}