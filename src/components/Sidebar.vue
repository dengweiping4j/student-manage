<template>
  <div class="sidebar">
    <el-menu class="sidebar-el-menu" :default-active="onRoutes" :collapse="collapse" background-color="#324157"
             text-color="#bfcbd9" active-text-color="#20a0ff" unique-opened router>
      <template v-for="item in items">
        <template v-if="item.subs">
          <el-submenu :index="item.index" :key="item.index">
            <template #title>
              <i :class="item.icon"></i>
              <span>{{ item.title }}</span>
            </template>
            <template v-for="subItem in item.subs">
              <el-submenu v-if="subItem.subs" :index="subItem.index" :key="subItem.index">
                <template #title>{{ subItem.title }}</template>
                <el-menu-item v-for="(threeItem, i) in subItem.subs" :key="i" :index="threeItem.index">
                  {{ threeItem.title }}
                </el-menu-item>
              </el-submenu>
              <el-menu-item v-else :index="subItem.index" :key="subItem.index">{{ subItem.title }}
              </el-menu-item>
            </template>
          </el-submenu>
        </template>
        <template v-else>
          <el-menu-item :index="item.index" :key="item.index">
            <i :class="item.icon"></i>
            <template #title>{{ item.title }}</template>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script>
import {computed, watch} from "vue";
import {useStore} from "vuex";
import {useRoute} from "vue-router";

export default {
  setup() {
    const items = [
      {
        icon: "el-icon-lx-home",
        index: "/dashboard",
        title: "系统首页",
      },
      {
        icon: "el-icon-lx-info",
        index: "/basic",
        title: "基础信息管理",
        subs: [
          {
            index: "/basic-student",
            title: "学生信息"
          },
          {
            index: "/basic-class",
            title: "班级管理"
          },
          {
            index: "/basic-grade",
            title: "年级管理"
          }
        ]
      },
      {
        icon: "el-icon-lx-news",
        index: "/xjgl",
        title: "学籍管理",
      },
      {
        icon: "el-icon-lx-calendar",
        index: "/qjgl",
        title: "请假管理",
      },
      {
        icon: "el-icon-lx-warn",
        index: "/wjcf",
        title: "违纪处分",
      },
      {
        icon: "el-icon-lx-emoji",
        index: "/knsgl",
        title: "困难生管理",
      },
      {
        icon: "el-icon-lx-like",
        index: "/pjpy",
        title: "评奖评优",
      },
      {
        icon: "el-icon-lx-roundcheck",
        index: "/zhcp",
        title: "综合测评",
        subs: [
          {
            index: "/ksgl",
            title: "考试管理"
          },
          {
            index: "/cjgl",
            title: "成绩管理"
          },
          {
            index: "/cjfx",
            title: "成绩分析"
          }
        ]
      },
      {
        icon: "el-icon-lx-apps",
        index: "/system",
        title: "系统管理",
        subs: [
          {
            index: "/user",
            title: "用户管理"
          }, {
            index: "/role",
            title: "角色管理"
          }, {
            index: "/menu",
            title: "菜单管理"
          }, {
            index: "/dict",
            title: "字典管理"
          }
        ]
      }
    ];

    const route = useRoute();

    const onRoutes = computed(() => {
      return route.path;
    });

    const store = useStore();
    const collapse = computed(() => store.state.collapse);

    return {
      items,
      onRoutes,
      collapse,
    };
  },
};
</script>

<style scoped>
.sidebar {
  display: block;
  position: absolute;
  left: 0;
  top: 70px;
  bottom: 0;
  overflow-y: scroll;
}

.sidebar::-webkit-scrollbar {
  width: 0;
}

.sidebar-el-menu:not(.el-menu--collapse) {
  width: 250px;
}

.sidebar > ul {
  height: 100%;
}
</style>
