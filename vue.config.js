const path = require('path')
module.exports = {
  pages: {
    index: {
      entry: 'src/main.js',
      template: 'public/index.html',
      filename: 'index.html',
      output: {
        filename: '[name].js',
        path: path.resolve(__dirname, '../dist')
      },
      title: 'sb-table 多功能表格编辑'
    }
  },
}
