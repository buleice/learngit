require('./check-versions')()

var config = require('../config')
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)
}

var opn = require('opn')
var path = require('path')
var express = require('express')
var webpack = require('webpack')
var proxyMiddleware = require('http-proxy-middleware')
var webpackConfig = require('./webpack.dev.conf')

//生成代理服务器
var axios = require('axios');

// default port where dev server listens for incoming traffic
var port = process.env.PORT || config.dev.port
// automatically open browser, if not set will be false
var autoOpenBrowser = !!config.dev.autoOpenBrowser
// Define HTTP proxies to your custom API backend
// https://github.com/chimurai/http-proxy-middleware
var proxyTable = config.dev.proxyTable

var app = express()
//第一步创建router
var apiRouter = express.Router();
//第二部设置get请求路径
apiRouter.get("/youkumo",(req,resp)=>{
	//第三部选择你要侵入的请求路径
	let url='http://ykrec.youku.com/pdrawer/packed/list.json';
	//第四部 发送请求
	axios.get(url,{
		//设置请求信息以及加密信息
		Header:{
				Host:'ykrec.youku.com',
				Referer:'http://youku.com/'
		},
		params:req.query
	}).then(response=>{
		//转换成json后返回给前台
		resp.json(response.data);
	})
})

//集成到服务器中
app.use("/youku",apiRouter);

apiRouter.get('/lyric',(req,res)=>{
  let url='https://c.y.qq.com/lyric/fcgi-bin/fcg_query_lyric_new.fcg';
  axios.get(url,{
    headers:{
      referer:'https://c.y.qq.com',
      host:'c.y.qq.com'
    },
    params:req.query
  }).then(response=>{
    //正则表达式，
    // /`开始
    // \w+任意字母开始
    // \(左括号
    //  \)右括号
    //  $/正则完毕
    // （）小括号内
    let ret=response.data;
    let json
    if(typeof ret==='string'){
      var reg=/^\w+\(({[^()]+})\)$/
      var mathers=ret.match(reg);
      if(mathers){
        json=JSON.parse(mathers[1])
      }
    }
res.json(json);
  })

})
app.use('/api',apiRouter);

apiRouter.get("/disc",(req,resp)=>{
  "use strict";
  let url = 'https://c.y.qq.com/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg';
  axios.get(url,{
    headers: {
      referer: 'https://c.y.qq.com/',
      host: 'c.y.qq.com'
    },
    params:req.query
  }).then(response=>{
    resp.json(response.data);
  })
})
app.use("/api",apiRouter);





var compiler = webpack(webpackConfig)

var devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  quiet: true
})

var hotMiddleware = require('webpack-hot-middleware')(compiler, {
  log: false,
  heartbeat: 2000
})
// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    hotMiddleware.publish({ action: 'reload' })
    cb()
  })
})

// proxy api requests
Object.keys(proxyTable).forEach(function (context) {
  var options = proxyTable[context]
  if (typeof options === 'string') {
    options = { target: options }
  }
  app.use(proxyMiddleware(options.filter || context, options))
})

// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')())

// serve webpack bundle output
app.use(devMiddleware)

// enable hot-reload and state-preserving
// compilation error display
app.use(hotMiddleware)

// serve pure static assets
var staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
app.use(staticPath, express.static('./static'))

var uri = 'http://localhost:' + port

var _resolve
var readyPromise = new Promise(resolve => {
  _resolve = resolve
})

console.log('> Starting dev server...')
devMiddleware.waitUntilValid(() => {
  console.log('> Listening at ' + uri + '\n')
  // when env is testing, don't need open it
  if (autoOpenBrowser && process.env.NODE_ENV !== 'testing') {
    opn(uri)
  }
  _resolve()
})

var server = app.listen(port)

module.exports = {
  ready: readyPromise,
  close: () => {
    server.close()
  }
}
