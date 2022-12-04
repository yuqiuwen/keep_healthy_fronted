<template>
  <a-layout class="header">
    <a-layout-header :style="{ position: 'fixed', zIndex: 1, width: '100%',}">
      <div class="logo" >
        <a-button type="link" @click="toHome">OUTOPIKÓ</a-button><br>
      </div>
      <a-menu v-model:selectedKeys="data.selectedKeys"
              mode="horizontal"
              theme="dark"
              :style="{ lineHeight: '64px'}"
              @click="handleClick">
        <a-sub-menu v-for="subMenu in data.navRoutes" :key="subMenu.name" @titleClick="titleClick">
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
      </a-menu>
      <div style="right:48px;position: fixed;top:2px">
        <a-dropdown placement="bottomRight">
          <div class="user-logo" v-if="data.isLogin"></div>
          <a v-else @click="toRegister" style="font-size: 18px;color: white" >Log in</a>
          <template #overlay v-if="data.isLogin">
            <a-menu @click="handleClick">
              <div class="user-detail" >{{ username }}</div>
              <a-menu-item key="UserCenter"><UserOutlined />  User Center</a-menu-item>
              <a-menu-item key="LogOut"><logout-outlined />  Log &nbsp;&nbsp;Out</a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
      </div>
    </a-layout-header>
  </a-layout>
</template>
<script setup>
import {defineComponent, ref, reactive, onMounted, onBeforeMount, watch,onBeforeUnmount,h, computed } from 'vue';
import navRoutes from '@/utils/nav'
import axios from 'axios'
import {mapState, useStore} from 'vuex'
import { useRouter, useRoute } from "vue-router";
import { UserOutlined, LogoutOutlined,LoadingOutlined } from '@ant-design/icons-vue';

const [store, router, route] = [useStore(), useRouter(), useRoute()]
const isLogin = ref(false)
const data = reactive({
  selectedKeys: ref(['Home']),
  navRoutes,
  headers: sessionStorage.getItem('token'),
  isLogin: sessionStorage.getItem('is_login')
})
// const isLogin = ref(sessionStorage.getItem('is_login'))
watch(
  ()=>data.isLogin,
  (newV, oldV) => {
    console.log(sessionStorage.getItem('is_login'))
    console.log('hahahah',newV)
    console.log('hahah',oldV)
  },
  {immediate:true, deep:true}
)

const username = sessionStorage.getItem('username')
const sex = sessionStorage.getItem('sex')
const userAvatar =  sex==='F'? `url('/img/girl.png')`:`url('/img/boy.png')`
let pageWidth = ref(document.documentElement.clientWidth || document.body.clientWidth)
let userVisible = ref(true)
const indicator = h(LoadingOutlined, {
  style: {
    fontSize: '24px',
  },
  spin: true,
});
const spinning = ref(false);

function sMobilePhone() {//判断当前设备是手机
  const ua = navigator.userAgent.toLowerCase();
  const t1 = /android|webos|iphone|ipod|blackberry|iemobile|opera mini/i.test(
      ua
  );
  // const t2 = !ua.match("iphone") && navigator.maxTouchPoints > 1;
  return t1 ;
}
onMounted(()=>{
  userVisible.value = !sMobilePhone()
  window.addEventListener('resize', () => {
    pageWidth.value = window.pageWidth || document.body.clientWidth;
    userVisible.value = pageWidth.value > 500 && !sMobilePhone()
  }, false);
})

function handleClick(item) {
  try {
    spinning.value = true
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
    spinning.value = false
  } catch (e) {
    spinning.value = false
  }

}
function toUser(){
  router.push({name: "UserCenter"})
}
function titleClick(key,domEvent){
  if (domEvent !== 'Health')
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
  width: 180px;
  text-align: center;
  color: whitesmoke;
  // background: url("/img/logo.png") no-repeat;
  //margin: 16px 24px 16px 0;
  font-size: 20px;
  font-family: Minion Pro,serif;
  margin-right: 40px;
  float: left;

}
.user-style{
  width: 100px;
  //position: fixed;
  right: 2px;
}
.user-detail {
  position: relative;
  text-align: center;
  margin: 10px auto;
  //z-index: 999;
  font-size: 16px;
  font-weight: bold;
}
.user-logo{
  height: 40px;
  width: 40px;
  margin-top: 12px;
  background: v-bind("userAvatar") no-repeat left;
  background-size: 40px 40px;
}

.header {
  height: 64px;
  width: 100%;
  position: relative;
}
</style>