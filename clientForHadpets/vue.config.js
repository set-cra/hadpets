module.exports = {
    devServer: {
        proxy: {
            //配置跨域
            '/api': {
                target: "http://192.168.1.5:8153",
                ws:false,
                changOrigin:true,
                pathRewrite:{
                    '^/api':''
                }
            }
        }
    }
  }