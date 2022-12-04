// 导航路由

export default [
    { title: 'Home', path: '/home', name: "Home"},
    {
        title: "Health",
        name: "Health",
        meta: {
            title: '首页',
            roles: ['user', 'admin'], //当前菜单哪些角色可以看到
        },
        children: [
            {title: "Diabetes Diagnosis", name: "Diabetes", path: 'diabetes' },
            {title: "xxx", name: "/home/workbench" },
        ],

    },
    {
        title: "Data",
        name: "Source",
        meta: {
            title: 'Source',
            roles: ['user', 'admin'], //当前菜单哪些角色可以看到
        },
        children: [
            {title: "Job", name: "Jobs", path: 'jobs' },
            {title: "CV", name: "Resume", path: 'resume' },
        ],

    },


]