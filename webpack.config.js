var path = require('path')
var HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
  // 入口文件配置
  entry: "./src/main.js",

  // 输出配置
  output: {
    // 输出的路径
    path: path.join(__dirname, 'dist'),
    // 静态资源在服务器上运行时的访问路径，可以直接http://localhost:8080/dist/bundle.js访问到服务器中的bundle.js文件
    // publicPath: '/dist',
    // 输出文件名字
    filename: "bundle.js"
  },
  module: {
    rules: [
      // 配置的是用来解析.css文件的loader(style-loader和css-loader)
      {
        // 1.0 用正则匹配当前访问的文件的后缀名是  .css
        test: /\.css$/,
        use: ['style-loader', 'css-loader'] //webpack底层调用这些包的顺序是从右到左
      },
      {
        test: /\.less$/,
        use: [{
          loader: 'style-loader'
        }, {
          loader: 'css-loader'
        }, {
          loader: 'less-loader'
        }]
      },
      {
        test: /\.js$/,
        exclude: /(node_modules)/, // node_modules下面的.js文件会被排除
        use: {
          loader: 'babel-loader',
          // options里面的东西可以放到.babelrc文件中去,options表示使用的es6的版本
          // options: {
          //   presets: ['env']
          // }
        }
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      // 打包引用的静态资源文件
      {
        test: /\.(png|jpg|gif|jpeg|svg|woff|ttf|ico)$/,
        use: [
          // 指定小于10kb的图片才转为base64编码打包
          { loader: 'url-loader', options: { limit: 10240 } }
        ]
      },
    ]
  },
  //  插件配置
  plugins: [
    // 自动注入打包好的js文件到body里
    new HtmlWebpackPlugin({
      template: './src/index.html',// 要处理的html
      filename: 'index.html',// 处理后的html名称
      inject: 'body',// 自动注入js到什么地方
    })
  ]
}