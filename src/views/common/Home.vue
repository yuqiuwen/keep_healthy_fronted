<template>
    <Nav style="height: 0;"></Nav>
    <div class="content">
      <a-carousel arrows autoplay="true" effect="fade">
        <template #prevArrow>
          <div class="custom-slick-arrow" style="font-size: 40px; left: 20px; z-index: 1">
            <left-outlined />
          </div>
        </template>
        <template #nextArrow>
          <div class="custom-slick-arrow" style="right: 30px">
            <right-outlined :style="{fontSize: '40px', color: '#fff'}"/>
          </div>
        </template>
        <div class="img-style" v-for="(item, index) in displayImg">
          <img :src="item"/>
          <div class="img-word">
            <div style="margin-bottom:30px">
              <h2>AI Diagnosis System Is Always With You</h2>
            </div>
            <a-button type="primary" shape="round" style="height: 50px;width: 200px;">
              <div style="display: flex;justify-content: center;align-items: center">
                <span style="font-weight: bold; font-size: 20px">GET STARTED&nbsp;</span>
                <arrow-right-outlined style="font-size: 25px; font-weight: bold"/>
              </div>

            </a-button>
          </div>
        </div>
      </a-carousel>
    </div>
</template>
<script setup>
import { defineComponent,  ref } from 'vue';
import navRoutes from '@/utils/nav'
import Nav from '@/views/common/Nav'
import { LeftOutlined, RightOutlined, ArrowRightOutlined } from '@ant-design/icons-vue';

const displayImg = [
    require('@/assets/img/home1.jpg'),
    require('@/assets/img/home2.jpg'),
]


</script>

<style scoped lang="scss">
.logo {
  width: 120px;
  height: 31px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px 24px 16px 0;
  float: left;
}

.content {
  background: #fff;
  height: calc(100vh);
  position: relative;
  .img-style {
    height:calc(100vh );
    //height: 100%;
    overflow: hidden;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;
    -webkit-background-size: cover;
    -o-background-size: cover;
    display: grid;
    text-align: center;
    place-items: center;
    background-color:rgba(0,0,0,0.3);
    .img-word {
      position: absolute;
      color: whitesmoke;
      left:0;right:0;margin:auto;
      bottom: 25%;
      text-align: center;
    }
    .img-word h2{
      height: 100%;
      font-size: 4vmin;
      text-align: center;
      color: whitesmoke;
    }
    img {
      height:calc(100vh);
      width:100%;
      position: absolute;
      background-color:rgba(0,0,0,0.5);
      z-index: -999;
      max-width:100%;
      max-height:100%;
    }
  }
}


/*.ant-carousel :deep(.slick-slide) {*/
/*  text-align: center;*/
/*  height: 160px;*/
/*  line-height: 160px;*/
/*  background: #364d79;*/
/*  overflow: hidden;*/
/*}*/

.ant-carousel :deep(.slick-arrow.custom-slick-arrow) {
  width: 25px;
  height: 25px;
  font-size: 25px;
  color: #fff;
  background-color: rgba(31, 45, 61, 0.11);
  opacity: 0.3;
  z-index: 1;
}
.ant-carousel :deep(.custom-slick-arrow:before) {
  display: none;
}
.ant-carousel :deep(.custom-slick-arrow:hover) {
  opacity: 0.5;
}

.ant-carousel :deep(.slick-slide h3) {
  color: #fff;
}
</style>