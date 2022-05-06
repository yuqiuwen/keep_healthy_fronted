<template>
  <a-layout class="header">
    <a-layout-header :style="{ position: 'fixed', zIndex: 1, width: '100%',}">
      <div class="logo" >
        <span @click="toHome">AnimaCare</span>
      </div>
      <a-menu v-model:selectedKeys="data.selectedKeys"
              mode="horizontal"
              :style="{ lineHeight: '64px' }"
              @click="handleClick">
        <a-sub-menu v-for="subMenu in data.navRoutes" :key="subMenu.name"  @titleClick="titleClick">
          <template #title>
            <span>{{ subMenu.title }}</span>
          </template>
          <a-menu-item
              v-for="menu in subMenu.children"
              :key="menu.name"
          >
            {{ menu.title }}
          </a-menu-item>
        </a-sub-menu>
        <a-sub-menu key="userCenter" style="right: 20px; position: fixed">
          <template #title >
            <div class="user-logo" v-if="isLogin">
<!--                <img :src="userAvatar"/>-->
            </div>
            <span v-else @click="toRegister" style="font-size: 18px">
              Log in/Register
            </span>

          </template>
          <template v-slot="status" v-if="isLogin">
            <div class="user-detail" >{{ username }}</div>
            <a-menu-item key="UserCenter">User Center</a-menu-item>
            <a-menu-item key="LogOut">Log Out</a-menu-item>
          </template>

        </a-sub-menu>
      </a-menu>
    </a-layout-header>
  </a-layout>
</template>
<script setup>
import {defineComponent, ref, reactive} from 'vue';
import navRoutes from '@/utils/nav'
import axios from 'axios'
import {useStore} from 'vuex'
import { useRouter, useRoute } from "vue-router";
import { UserOutlined } from '@ant-design/icons-vue';

const [store, router, route] = [useStore(), useRouter(), useRoute()]

const data = reactive({
  selectedKeys: ref(['Home']),
  navRoutes,
  headers: sessionStorage.getItem('token')
})



const username = sessionStorage.getItem('username')
let isLogin = sessionStorage.getItem('is_login')
const sex = sessionStorage.getItem('sex')
const userAvatar =  sex==='F'? `url('/img/girl.png')`:`url('/img/boy.png')`


function handleClick(item) {
  console.log(item.key)
  if (item.key === 'LogOut') {
    axios.post('users/logout/', {}).then((res)=>{
      console.log(res)
      sessionStorage.clear()
      if (route.name==='Home') router.go(0)
      router.push({name: 'Home'})
    })
  } else {
    router.push({name: item.key})
  }
}
function toUser(){
  router.push({name: "UserCenter"})
}
function titleClick(key,domEvent){
  router.push({name: domEvent})
}
function toRegister() {
  router.push({name: 'Login'})
}
function toHome() {
  router.push({name: 'Home'})
}


</script>

<style lang="scss">
.logo {
  width: 140px;
  height: 31px;
  text-align: center;
  //background: url("/img/logo.png") no-repeat;
  //margin: 16px 24px 16px 0;
  font-size: 34px;
  font-family: Minion Pro,serif;
  margin-right: 40px;
  float: left;
}
.user-style{
  width: 100px;
  position: fixed;
  right: 2px;

}
.user-detail {
  position: relative;
  text-align: center;
  margin: 20px auto;
  background-color: #42b983;
  z-index: 999;
  font-size: 16px;
  font-weight: bold;
}
.user-logo{
  height: 48px;
  width: 48px;
  margin: 5px;
  background: v-bind("userAvatar") no-repeat left;
  background-size: 40px 40px;
}

.user-logo:hover{
  //box-shadow: inset 0 0 0 1px rgba(255,255,255,.1),0 1px 2px rgba(0,0,0,.1);
  //background-color: #00a1ff;
}
.header {
  height: 64px;
  width: 100%;
  position: relative;
}
</style>