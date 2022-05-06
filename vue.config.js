module.exports = {
    devServer:{
        host: '0.0.0.0',
        port:8080, // 启动端口号
        open:true  // 启动后是否自动打开网页
    },
    css: {
        loaderOptions: {
            less: {
                lessOptions: {
                    modifyVars: {
                        'primary-color': '#5dc2b4',
                        'link-color': '#5dc2b4',
                        'font-size-base': '16px',
                        // 'border-radius-base': '34px',
                        'component-background': '#fcfcfc',
                        'layout-header-background': '#f4f7f6',
                        'layout-header-height': '64px',
                        'menu-bg': '#f4f7f6',
                        'menu-popup-bg': '#F2F4F5',
                        // 'layout-header-background': '#fff'
                        'primary-1': "color(~`colorPalette('@{primary-color}', 1) `)"

                    },
                    javascriptEnabled: true,
                },
            },
        },
    },
};