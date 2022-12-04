1<template>
  <div id="container">
    <div class="main">
      <div class="form">
        <h2 style="margin: 15px;">{{ otherObj.isLogin? 'Sign in': 'Sign Up' }}</h2>
        <a-form
            ref="formRef"
            :model="formState"
            name="normal_login"
            class="login-form"
            label
            :label-col="otherObj.labelCol"
            labelAlign="left"
            @finish="onFinish"
            @finishFailed="onFinishFailed"
        >

              <a-form-item
                  label="User"
                  name="username"
                  :rules="[{ required: true, message: 'Please input your username!' }]"
              >
                <a-input v-model:value="formState.username"></a-input>
              </a-form-item>


            <a-form-item
                label="Password"
                name="password"
                :rules="[{ required: true, message: 'Please input your password!' }]"
            >
              <a-input-password v-model:value="formState.password">
              </a-input-password>
            </a-form-item>
          <a-form-item
              label="Email"
              name="email"
              :rules="[{ required: true, message: 'Please input your email!' }]"
          >
            <a-input v-model:value="formState.email">
            </a-input>
          </a-form-item>

              <a-form-item
                  v-if="!otherObj.isLogin"
                  label="Code"
                  name="email"
                  :rules="[{ required: true, message: 'Please input verify code!' }]"
              >
                <a-row :gutter="16">
                <a-col :span="16">
                  <a-input v-model:value="formState.verifyCode" placeholder="verify code">
                  </a-input>
                </a-col>
                <a-col :span="8">
                  <a-button type="primary" @click="sendMail" :disabled="!show">
                    <span v-show="show">send</span>
                    <span v-show="!show" class="count">{{ count }} s</span>
                  </a-button>
                </a-col>
                </a-row>
              </a-form-item>

              <a-form-item name="is_remember" no-style>
                <a-checkbox v-model:checked="formState.is_remember" >remember me</a-checkbox>
              </a-form-item>
          <br>
            <a-form-item>
              <a-button block :disabled="disabled" @click="onsubmit" type="primary" html-type="submit" class="login-form-button">
                {{ otherObj.isLogin? 'LOGIN': 'Sign Up' }}
              </a-button>
              <a-button type="link" style="color: #528ec2" block @click="register">{{  otherObj.isLogin? 'or register now': 'return login'}}</a-button>
            </a-form-item>
        </a-form>
      </div>
    </div>
  </div>
</template>
<script setup>
  import {toRefs,ref, reactive, computed} from 'vue'
  import { useRouter, useRoute } from "vue-router"
  import {useStore} from 'vuex'
  import axios from "axios";
  import {message} from 'ant-design-vue'

  const store = useStore()
  const [router, route] = [useRouter(), useRoute()]
  let formState = reactive({
    username: '',
    password: '',
    email: '',
    is_remember: true,
    verifyCode: ''
  });
  let otherObj = reactive({
    isLogin: true,
    labelCol: {
      style: {
        width: '100px',
      },
    },
  })
  const show = ref(true);
  const timer = ref();
  const TIME_COUNT = ref(60);
  const count = ref();
  const formRef = ref();
  let sendBtn = ref('发送')
  const onFinish = values => {
    console.log('Success:', values);
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  const disabled = computed(() => {
    return !(formState.username && formState.password && formState.email);
  });
  function sendMail() {
    let {username, password, email,} = formState
    if (email===''||username==='') return message.error('邮箱或用户名不能为空')
    if (!timer.value) {
      count.value = TIME_COUNT.value
      show.value = false
      timer.value = setInterval(()=>{
        if(count.value !== 0){
          count.value --
        } else{
          show.value = true
          clearInterval(timer.value)
          timer.value = null
        }
      }, 1000)
    }
    axios.post('users/send_email/',{email: formState.email, username: formState.username}).then(({data: res})=>{
      formState.task_id = res.results
      if (res.results.code===500)
      console.log(formState)
    }).catch(e=>{
      show.value = true
      clearInterval(timer.value)
      timer.value = null
      message.error('发送失败')
    })
  }

  //提交
  const onsubmit = ()=> {
    let [url,successInfo, errorInfo] = [
        'users/login/',
        '登录成功',
        '登录失败,请检查信息是否填写正确',
    ]
    if (!otherObj.isLogin) {
      [url,successInfo, errorInfo] = [
        'users/register/',
        '注册成功',
        '注册失败'
      ]
    }
    axios.post(url,formState).then(({data : res, status: status}) => {
      if (status === 200 && res.code === 200) {
        console.log(res.results)
        if (res.results){
          store.commit('set_token', res.results)
          store.commit('set_token', {is_login: true})
        }
        // 跳转后页面未刷新，还不知道怎么解决
        router.push({ name:'Home' })
        message.success(successInfo)
      } else {
        store.commit('del_token')
        store.commit('del_user')
        return message.error(res.results.msg)
      }
    }).catch((err)=> {
      console.log(err)
      message.error('login failed')
    })
  }
  function register(){
    formRef.value.resetFields()
    otherObj.isLogin = !otherObj.isLogin
  }
</script>
<style scoped lang="scss">
#container {
  width: 100%;
  height:calc(100vh );
  display: grid;
  place-items:center;
  justify-content: center;
  background: url("../../assets/img/login_bg.jpg") center center no-repeat;
  background-size: cover;
  -webkit-background-size: cover;
  -o-background-size: cover;

  .main {
    border-radius: 20px;
    background: rgba(245, 243, 243, 0.5);
    display: -webkit-flex;
    width: 450px;
    place-items:center;
    justify-content: center;
    .form {
      padding: 0 40px;
      color: white;
    }
  }
}

</style>