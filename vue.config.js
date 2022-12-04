module.exports = {
    devServer:{
        host: '127.0.0.1',
        port:8080, // 启动端口号
        open:true,  // 启动后是否自动打开网页
        proxy: {
            '/citydata/': {
                'target': 'https://restapi.amap.com/v3/config/district/', //地图接口地址
                'secure': true, // false为http访问，true为https访问
                'changeOrigin': true, // 跨域访问设置，true代表跨域
                'pathRewrite': { // 路径改写规则
                    '^http://127.0.0.1:8000/citydata': '' // 以/citydata/为开头的改写为''
                },
            }
        },
    },
    css: {
        loaderOptions: {
            less: {
                lessOptions: {
                    modifyVars: {
                        'primary-color': '#44b6ae',
                        'link-color': '#44b6ae',
                        'font-size-base': '16px',
                        // 'border-radius-base': '34px',
                        // 'component-background': '#fcfcfc',
                        // 'layout-header-background': '#2a3643',  
                        // 'layout-header-height': '64px',
                        // 'menu-item-color': '#fff',  // 菜单文字颜色
                        // 'menu-bg': '#2a3643',
                        'menu-popup-bg': '#44b6ae',
                        // 'menu-highlight-color': '#35c5d2',
                        // 'menu-inline-submenu-bg': '#35c5d2',
                        // 'menu-item-active-bg':'#f0fffa',
                        'primary-1': "color(~`colorPalette('@{primary-color}', 1) `)"

                    },
                    javascriptEnabled: true,
                },
            },
        },
    },
};