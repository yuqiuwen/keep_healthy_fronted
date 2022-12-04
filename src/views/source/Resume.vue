<template>
  <Nav />
  <div class="main_content">
    <a-button type="primary" @click="showModal=true">Open Modal</a-button>
    <a-modal
        ref="modalRef"
        v-model:visible="showModal"
        width="900px"
        :bodyStyle="{'height': '60vh', overflowY: 'scroll', backgroundColor:'#f4f7f6'}"
        :wrap-style="{ overflow: 'hidden' }"
        wrap-class-name="full-modal"
        @ok="handleOk"
    >
      <div style="margin-bottom: 40px">
        <a-steps v-model:current="current" size="small">
          <a-step v-for="item in steps" :title="item.title" />
        </a-steps>
      </div>

      <a-form :label-col="labelCol" label :model=resumeForm  labelAlign="left">
        <div v-if="current===0">
          <div class="my-divider">个人信息</div>
          <a-card hoverable >
            <a-row :gutter="60">
              <a-col :span="12">
                <a-form-item label="姓名" name="name">
                  <a-input v-model:value="resumeForm.baseInfo.name"></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="12">
                <a-form-item label="求职意向" :labelCol="{span: 6}" name="purpose">
                  <a-input v-model:value="resumeForm.baseInfo.purpose"></a-input>
                </a-form-item>
              </a-col>
            </a-row>
            <a-row :gutter="60">
              <a-col :span="12">
                <a-form-item label="年龄" name="age">
                  <a-input v-model:value="resumeForm.baseInfo.age"></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="12">
                <a-form-item label="籍贯" name="home">
                  <a-input v-model:value="resumeForm.baseInfo.home"></a-input>
                </a-form-item>
              </a-col>
            </a-row>
            <a-row :gutter="60">
              <a-col :span="12">
                <a-form-item label="电话" name="phone">
                  <a-input v-model:value="resumeForm.baseInfo.phone"></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="12">
                <a-form-item label="邮箱" name="email">
                  <a-input v-model:value="resumeForm.baseInfo.email"></a-input>
                </a-form-item>
              </a-col>
            </a-row>
          </a-card>
          <div class="my-divider">
            <span>教育背景</span>
            <a-button type="primary" >添加</a-button>
          </div>
          <a-card hoverable v-for="(item, index) in resumeForm.baseInfo.education" :key="index">
            <a-row :gutter="60">
              <a-col :span="12">
                <a-form-item label="学校" name="university">
                  <a-input  v-model:value="item.university"></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="12">
                <a-form-item label="专业" name="major">
                  <a-input v-model:value="item.major"></a-input>
                </a-form-item>
              </a-col>
            </a-row>
            <a-row :gutter="60">
              <a-col :span="12">
                <a-form-item label="学历" name="diploma">
                  <a-select v-model:value="item.diploma" placeholder="Please select a country">
                    <a-select-option v-for="i in diplomas" :value="i">{{ i }}</a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :span="12">
                <a-form-item label="毕业时间" :labelCol="{span: 5}" name="city">
                  <a-space direction="vertical" :size="12">
                    <a-range-picker v-model:value="item.period" />
                  </a-space>
                </a-form-item>
              </a-col>
            </a-row>
            <a-row :gutter="40">
              <a-col :span="18">
                <a-form-item label="主修课程" :labelCol="{span: 4}" name="name">
                  <a-input v-model:value="item.course"></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="6">
                <a-form-item label="GPA" name="age">
                  <a-input v-model:value="item.gpa"></a-input>
                </a-form-item>
              </a-col>

            </a-row>
          </a-card>
        </div>

        <div v-else-if="current===1">
          <div class="my-divider">工作经历
            <a-button type="primary" >添加</a-button>
          </div>
          <a-card hoverable v-for="(item, index) in resumeForm.workExperience" :key="index">
                <a-form-item label="公司名称" :labelCol="{span: 3}" name="company">
                  <a-input v-model:value="item.company"></a-input>
                </a-form-item>
                <a-form-item label="职位名称" :labelCol="{span: 3}"  name="title">
                  <a-input v-model:value="item.title"></a-input>
                </a-form-item>
                <a-form-item label="任职时间" :labelCol="{span: 3}" name="period">
                  <a-space direction="vertical" :size="12">
                    <a-range-picker v-model:value="item.period" />
                  </a-space>
                </a-form-item>
                <a-form-item label="描述" :labelCol="{span: 3}" name="describe">
                  <a-input v-model:value="item.describe"></a-input>
                </a-form-item>
                <a-form-item label="职责" :labelCol="{span: 3}" name="content">
                  <a-input v-model:value="item.content"></a-input>
                </a-form-item>
          </a-card>
        </div>
        <div v-else-if="current===2">
          <div class="my-divider">
            <span>项目经验</span>
            <a-button type="primary" >添加</a-button>
          </div>
          <a-card hoverable v-for="(item, index) in resumeForm.projectExperience" :key="index">
            <a-form-item label="项目名称" :labelCol="{span: 3}" name="company">
              <a-input v-model:value="item.company"></a-input>
            </a-form-item>
            <a-form-item label="担当角色" :labelCol="{span: 3}"  name="title">
              <a-input v-model:value="item.title"></a-input>
            </a-form-item>
            <a-form-item label="时间" :labelCol="{span: 3}" name="period">
              <a-space direction="vertical" :size="12">
                <a-range-picker v-model:value="item.period" />
              </a-space>
            </a-form-item>
            <a-form-item label="描述" :labelCol="{span: 3}" name="describe">
              <a-input v-model:value="item.describe"></a-input>
            </a-form-item>
            <a-form-item label="职责" :labelCol="{span: 3}" name="content">
              <a-input v-model:value="item.content"></a-input>
            </a-form-item>
          </a-card>
        </div>
        <div v-else-if="current===3">
          <div class="my-divider">
            <span>实习经历</span>
            <a-button type="primary" >添加</a-button>
          </div>
          <a-card hoverable v-for="(item, index) in resumeForm.practiceExperience" :key="index">
            <a-form-item label="公司名称" :labelCol="{span: 3}" name="company">
              <a-input v-model:value="item.company"></a-input>
            </a-form-item>
            <a-form-item label="职位名称" :labelCol="{span: 3}"  name="title">
              <a-input v-model:value="item.title"></a-input>
            </a-form-item>
            <a-form-item label="任职时间" :labelCol="{span: 3}" name="period">
              <a-space direction="vertical" :size="12">
                <a-range-picker v-model:value="item.period" />
              </a-space>
            </a-form-item>
            <a-form-item label="描述" :labelCol="{span: 3}" name="describe">
              <a-input v-model:value="item.describe"></a-input>
            </a-form-item>
            <a-form-item label="职责" :labelCol="{span: 3}" name="content">
              <a-input v-model:value="item.content"></a-input>
            </a-form-item>
          </a-card>
        </div>
        <div v-else-if="current===4">
          <div class="my-divider">
            <span>专业技能</span>
            <a-button type="primary" @click="addItem(resumeForm.skills)">添加</a-button>
          </div>
          <a-card hoverable>

              <a-form-item v-for="(item, index) in resumeForm.skills"  :labelCol="{span: 1}" name="name" :key="index">
                <a-row :gutter="20">
                  <a-col :span="20">
                    <a-input v-model:value="item.value"></a-input>
                  </a-col>
                <a-col :span="2">
                  <a-button v-if="resumeForm.skills.length>1" @click="removeItem(resumeForm.skills, index)">删除</a-button>
                </a-col>

                </a-row>

              </a-form-item>


          </a-card>
          <div class="my-divider">
            <span>获奖证书</span>
            <a-button type="primary" @click="addItem(resumeForm.awards)">添加</a-button>
          </div>
            <a-card hoverable
                    v-for="(item, index) in resumeForm.awards" :key="index"
                    @mouseenter="onEnterItem(resumeForm.awards, index)"
                    @mouseleave="onLeaveItem(resumeForm.awards, index)">
              <a-form-item label="奖项名称" :labelCol="{span: 3}" name="awardName">
                <a-input v-model:value="item.awardName"></a-input>
              </a-form-item>
              <a-form-item label="获奖时间" :labelCol="{span: 3}"  name="awardTime">
                  <a-range-picker v-model:value="item.awardTime" />

              </a-form-item>
            </a-card>

        </div>
        <a-card hoverable v-else>
          <a-textarea :rows="6" v-model:value="resumeForm.selfEvaluation" showCount="true" :maxlength="200" />
        </a-card>
      </a-form>
      <a-button v-if="current < steps.length - 1" type="primary" @click="next">Next</a-button>
      <a-button
          v-if="current == steps.length - 1"
          type="primary"
          @click="message.success('Processing complete!')"
      >
        Done
      </a-button>
      <a-button v-if="current > 0" style="margin-left: 8px" @click="prev">Previous</a-button>
      <template #title>
        <div ref="modalTitleRef" style="width: 100%; cursor: move">Draggable Modal</div>
      </template>
      <template #modalRender="{ originVNode }">
        <div :style="transformStyle">
          <component :is="originVNode" />
        </div>
      </template>
    </a-modal>
  </div>


</template>

<script>
import Nav from '../common/Nav'
import { ref, reactive, onMounted } from 'vue';
import axios from "axios";
// import mapKey from "mapKey"
import { SettingOutlined, EditOutlined, EllipsisOutlined, InfoCircleOutlined, PlusOutlined } from '@ant-design/icons-vue';
import { jsPDF } from "jspdf";
import html2Canvas from 'html2canvas'



export default {
  name: "Resume",
  components: {Nav},
  data() {
    return {
      diplomas: ['博士','硕士','本科','大专','中专','高中','其他'],
      labelCol: {style: {width: '50px',},},
      wrapperCol: {span: 14,},
      showModal: false,
      current:0,
      resumeForm: {
        baseInfo: {
          name: '',
          purpose: '',
          age: '',
          home: '',
          phone: '',
          email: '',
          education: [
            {
              period: '',
              university: '',
              major: '',
              diploma: '',
              gpa: '',
              course: ''
            },
          ],
        },
        workExperience: [
          {
            period: '',
            company: '',
            title: '',
            describe: '',
            content: ''
          }
        ],
        projectExperience: [
          {
            period: '',
            company: '',
            title: '',
            describe: '',
            content: ''
          }
        ],
        practiceExperience: [
          {
            period: '',
            company: '',
            title: '',
            describe: '',
            content: ''
          }
        ],
        skills: [],
        awards: [
          {
            awardTime: '',
            awardName: ''
          }
        ],
        selfEvaluation: '',
      },
      steps: [
        {title: '基本信息', content: '',},
        {title: '工作经历', content: 'Second-content',},
        {title: '项目经验', content: 'Last-content',},
        {title: '实习经历', content: 'Last-content',},
        {title: '技能证书', content: 'Last-content',},
        {title: '自我评价', content: 'Last-content',},
      ],

    }
  },
  created() {
    this.getResumeData()
  },
  methods: {
    addItem(item) {
      let obj = {}
      for (let i in item[0]) {
        obj[i] = ''  // a b c d
        console.log(obj)
      }
      item.push(obj)
    },
    removeItem(item, index) {
      console.log(item)
      item.splice(index, 1)
    },
    onEnterItem() {

    },
    async getResumeData() {
      const res = axios.get('source/resume/')
    },
    async handleOk(){
      console.log(this.resumeForm)
      const res = axios.post('source/resume/',this.resumeForm)

    },
    genPdf() {
      const myFont = '微软雅黑'
    }
  }
}
</script>

<style scoped lang="scss">
  .main_content {
    margin: 20px 50px;
  }
  .full-modal {
    .ant-modal {
      max-width: 100%;
      top: 0;
      padding-bottom: 0;
      margin: 0;
    }
    .ant-modal-content {
      background-color: #fafafa;
      display: flex;
      flex-direction: column;
      height: calc(100% - 60px);
    }
    .ant-modal-body {
      flex: 1;
    }
  }
  .steps-content {
    margin-top: 16px;
    border: 1px dashed #e9e9e9;
    border-radius: 6px;
    background-color: #fafafa;
    //min-height: 200px;
    padding: 20px;
  }
  .steps-action {
    margin-top: 24px;
  }

  .my-divider {
    display: flex;
    margin: 16px 0;
    color: #fff;
    font-weight: 500;
    font-size: 18px;
    justify-content: space-between;
    text-align: center;
    align-items: center;
    padding-left: 20px;
    background-color: #5dc2b4;
  }
</style>