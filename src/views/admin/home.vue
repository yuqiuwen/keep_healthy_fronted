<template>
  <a-layout style="min-height: 100vh">
    <a-layout-sider v-model:collapsed="collapsed" collapsible>
      <div class="side-header">
        <div class="logo" />
        <div class="username">
          <span style="color: black">{{user}}</span>
        </div>

      </div>

      <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline">
        <a-menu-item key="1">
          <pie-chart-outlined />
          <span>健康管理</span>
        </a-menu-item>
        <a-menu-item key="2">
          <desktop-outlined />
          <span>Option 2</span>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-content style="margin: 0 16px">
        <a-breadcrumb style="margin: 16px 0">
          <a-breadcrumb-item>Health</a-breadcrumb-item>
          <a-breadcrumb-item>diabetes</a-breadcrumb-item>
        </a-breadcrumb>
        <div :style="{ padding: '24px', background: '#fff', minHeight: '360px' }">
          sss
        </div>
      </a-layout-content>
      <a-layout-footer style="text-align: center">
        Ant Design ©2018 Created by Ant UED
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>
<script setup>

import {  PieChartOutlined, DesktopOutlined, UserOutlined, TeamOutlined, FileOutlined } from '@ant-design/icons-vue';
import {  ref, reactive } from 'vue';


const selectedKeys = ref(['1'])
const collapsed = ref(false)
const user = ref(sessionStorage.getItem('username'))

</script>

<style scoped lang="scss">
.side-header {
  height: 48px;
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 40px 0;
  .logo {
    height: 48px;
    width: 48px;
    //margin: 16px;
    background: url("/img/girl.png") no-repeat left;
    background-size: 40px 40px;
    border-radius: 48px;
    flex: 0 1 48px;
  }
  .username {
    color: #ffffff;
  }
}

</style>