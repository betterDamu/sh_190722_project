const path = require('path')
function resolve (dir) {
    return path.join(__dirname, dir)
}
module.exports={
    lintOnSave:false,
    devServer:{
        open:true,
        proxy: {
            '/4000': {
                target: 'http://localhost:4000',
                changeOrigin: true,
                pathRewrite: {
                    '^/4000': ''
                }
            }
        }
    },
    configureWebpack:{
        resolve: {
            alias: {
                'components': resolve('src/components'),
                'pages': resolve('src/pages')
            }
        }
    }
}