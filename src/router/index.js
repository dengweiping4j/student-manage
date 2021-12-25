import {createRouter, createWebHashHistory} from "vue-router";
import Home from "../views/Home.vue";

const routes = [
  {
    path: '/',
    redirect: '/dashboard'
  }, {
    path: "/",
    name: "Home",
    component: Home,
    children: [
      {
        path: "/dashboard",
        name: "dashboard",
        meta: {
          title: '系统首页'
        },
        component: () => import ( /* webpackChunkName: "dashboard" */ "../views/Dashboard.vue")
      }, {
        path: "/basic-student",
        name: "basic-student",
        meta: {
          title: '学生信息'
        },
        component: () => import ( /* webpackChunkName: "basicstudent" */ "../views/basic/basic-student/index.vue")
      },
      {
        path: "/basic-class",
        name: "basic-class",
        meta: {
          title: '班级管理'
        },
        component: () => import ( /* webpackChunkName: "basicstudent" */ "../views/basic/basic-class/index.vue")
      }, {
        path: "/basic-grade",
        name: "basic-grade",
        meta: {
          title: '年级管理'
        },
        component: () => import ( /* webpackChunkName: "basicstudent" */ "../views/basic/basic-grade/index.vue")
      }, {
        path: "/xjgl",
        name: "xjgl",
        meta: {
          title: '学籍管理'
        },
        component: () => import ( /* webpackChunkName: "basicstudent" */ "../views/xjgl/index.vue")
      }, {
        path: "/qjgl",
        name: "qjgl",
        meta: {
          title: '请假管理'
        },
        component: () => import ( /* webpackChunkName: "basicstudent" */ "../views/qjgl/index.vue")
      }, {
        path: "/wjcf",
        name: "wjcf",
        meta: {
          title: '违纪处分'
        },
        component: () => import ( /* webpackChunkName: "basicstudent" */ "../views/wjcf/index.vue")
      }, {
        path: "/knsgl",
        name: "knsgl",
        meta: {
          title: '困难生管理'
        },
        component: () => import ( /* webpackChunkName: "basicstudent" */ "../views/knsgl/index.vue")
      }, {
        path: "/pjpy",
        name: "pjpy",
        meta: {
          title: '评奖评优'
        },
        component: () => import ( /* webpackChunkName: "basicstudent" */ "../views/pjpy/index.vue")
      }, {
        path: "/ksgl",
        name: "ksgl",
        meta: {
          title: '考试管理'
        },
        component: () => import ( /* webpackChunkName: "basicstudent" */ "../views/zhcp/ksgl/index.vue")
      }, {
        path: "/cjgl",
        name: "cjgl",
        meta: {
          title: '成绩管理'
        },
        component: () => import ( /* webpackChunkName: "basicstudent" */ "../views/zhcp/cjgl/index.vue")
      }, {
        path: "/cjfx",
        name: "cjfx",
        meta: {
          title: '成绩分析'
        },
        component: () => import ( /* webpackChunkName: "basicstudent" */ "../views/zhcp/cjfx/index.vue")
      }, {
        path: "/yhgl",
        name: "yhgl",
        meta: {
          title: '用户管理'
        },
        component: () => import ( /* webpackChunkName: "basicstudent" */ "../views/system/yhgl/index.vue")
      }, {
        path: "/cdgl",
        name: "cdgl",
        meta: {
          title: '菜单管理'
        },
        component: () => import ( /* webpackChunkName: "basicstudent" */ "../views/system/cdgl/index.vue")
      }, {
        path: "/jsgl",
        name: "jsgl",
        meta: {
          title: '角色管理'
        },
        component: () => import ( /* webpackChunkName: "basicstudent" */ "../views/system/jsgl/index.vue")
      }, {
        path: "/zdgl",
        name: "zdgl",
        meta: {
          title: '字典管理'
        },
        component: () => import ( /* webpackChunkName: "basicstudent" */ "../views/system/zdgl/index.vue")
      }
    ]
  }, {
    path: "/login",
    name: "Login",
    meta: {
      title: '登录'
    },
    component: () => import ( /* webpackChunkName: "login" */ "../views/Login.vue")
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title} | student-work-manage`;
  const role = localStorage.getItem('ms_username');
  if (!role && to.path !== '/login') {
    next('/login');
  } else if (to.meta.permission) {
    // 如果是管理员权限则可进入，这里只是简单的模拟管理员权限而已
    role === 'admin'
      ? next()
      : next('/403');
  } else {
    next();
  }
});

export default router;
