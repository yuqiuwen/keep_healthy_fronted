<template>
    <Nav />
    <div class="main">
        <a-card hoverable :bordered="true" >
        <a-form
            ref="formRef"
            name="custom-validation"
            :model="formData"
            :rules="rules"
            v-bind="layout"
            @finish="handleFinish"
            @validate="handleValidate"
            @finishFailed="handleFinishFailed"
        >
          <a-form-item has-feedback label="Pregnancies" name="pregnancies">
            <a-input-number v-model:value="formData.pregnancies" />
          </a-form-item>
          <a-form-item has-feedback label="Glucose" name="glucose">
            <a-input-number v-model:value="formData.glucose" />
          </a-form-item>
          <a-form-item has-feedback label="BloodPressure" name="blood_pressure">
            <a-input-number v-model:value="formData.blood_pressure" placeholder="mm Hg" />
          </a-form-item>
          <a-form-item has-feedback label="SkinThickness" name="skin_thickness">
            <a-input-number v-model:value="formData.skin_thickness" placeholder="mm" />
          </a-form-item>
          <a-form-item has-feedback label="Insulin" name="insulin">
            <a-input-number v-model:value="formData.insulin" placeholder="μU/ml"/>
          </a-form-item>
          <a-form-item has-feedback label="BMI" name="bmi">
            <a-input-number v-model:value="formData.bmi" />
          </a-form-item>
          <a-form-item has-feedback label="PedigreeFunction" name="pedigree_function">
            <a-input-number v-model:value="formData.pedigree_function" />
          </a-form-item>
          <a-form-item has-feedback label="Age" name="age">
            <a-input-number v-model:value="formData.age" />
          </a-form-item>
          <a-form-item >
            <a-button type="primary" block html-type="submit" @click="methods.startPred">Finish</a-button>
          </a-form-item>
        </a-form>
        </a-card>

<!--            <a-table-->
<!--                :columns="columns"-->
<!--                :row-key="id"-->
<!--                :data-source="diabetesData"-->
<!--                :scroll="{ y: 180 }"-->
<!--                :pagination="pagination"-->
<!--                :loading="loading"-->
<!--                size="small"-->
<!--                @change="handleTableChange"-->
<!--            >-->
<!--              <template #bodyCell="{ column, text }">-->
<!--                <template v-if="column.dataIndex === 'create_time'">{{ text.replace(/T/g, ' ') }}</template>-->
<!--              </template>-->
<!--            </a-table>-->

    <a-card hoverable title="Result">
      <a-result
          v-if="prediction"
          :status="predResult.status"
          :title="predResult.Title"
          :sub-title="predResult.subTitle"
      >
        <template #extra>
          <a-button key="console" type="primary">View Analytics</a-button>
          <a-button key="buy">Predict Again</a-button>
        </template>
      </a-result>
    </a-card>
    </div>



</template>



<script setup>
import Nav from '../common/Nav'
import { ref, reactive, onMounted } from 'vue';
import axios from "axios";
import { SettingOutlined, EditOutlined, EllipsisOutlined } from '@ant-design/icons-vue';

const model = 'diabetes'
const layout = {
  labelCol: {
    span: 14,
  },
  wrapperCol: {
    span: 24,
  },
}
let predResult=reactive({
  Title:'',
  subTitle: '',
  status: 'success',
})
let prediction = ref(null)

let predResultContent = parseFloat(prediction)<0.5?
    'Lower risk of diabetes and good health':
    'Be alert to the risk of developing diabetes'

const rules = {
  pregnancies: [{required: true, trigger: 'change',}],
  glucose: [{required: true, trigger: 'change',}],
  blood_pressure: [{required: true, trigger: 'change',}],
  skin_thickness: [{required: true, trigger: 'change',}],
  insulin: [{required: true, trigger: 'change',}],
  bmi: [{required: true, trigger: 'change',}],
  pedigree_function: [{required: true, trigger: 'change',}],
  age: [{required: true, trigger: 'change',}],
}
const columns = [
  {
    title: 'id',
    dataIndex: 'id',
    align: 'center',
    width: 30,
  },
  {
    title: 'Pregnancies',
    dataIndex: 'pregnancies',
    align: 'center',
    width: 64,
  },
  {
    title: 'Glucose',
    dataIndex: 'glucose',
    align: 'center',
    width: 40,
  },
  {
    title: 'BloodPressure',
    dataIndex: 'blood_pressure',
    align: 'center',
    width: 60,
  },
  {
    title: 'SkinThickness',
    dataIndex: 'skin_thickness',
    align: 'center',
    width: 60,
  },
  {
    title: 'Insulin',
    dataIndex: 'insulin',
    align: 'center',
    width: 50,
  },
  {
    title: 'BMI',
    dataIndex: 'bmi',
    align: 'center',
    width: 50,
  },
  {
    title: 'PedigreeFunction',
    dataIndex: 'pedigree_function',
    align: 'center',
    width: 70,
  },
  {
    title: 'Age',
    dataIndex: 'age',
    align: 'center',
    width: 40,
  },
  {
    title: 'Outcome',
    dataIndex: 'outcome',
    align: 'center',
    width: 50,
  },
  {
    title: 'CreateTime',
    dataIndex: 'create_time',
    align: 'center',
    width: 100,
  },

]
const formData = reactive({
  pregnancies: '',
  glucose: '',
  blood_pressure: '',
  skin_thickness: '',
  insulin: '',
  bmi: '',
  pedigree_function: '',
  age: '',
})
let diabetesData = ref(null)

const methods = {
  fetchDiabetesData() {
    axios.get(model + '/fetch_diabetes_data/',).then(({data: res})=>{
      console.log(res)
      diabetesData.value = res.results
    })
  },
  startPred() {
    console.log(formData)
    axios.post(model + '/start_pred_diabetes/',formData).then(({data:res})=>{
      let results = res.results[1]
      prediction.value = results
      console.log(prediction.value)
      if (results<0.5) {
        predResult.status = 'success'
        predResult.Title = `${(results*100).toFixed(1)}% Good`
        predResult.subTitle = 'Lower risk of diabetes and good health'
      } else {
        predResult.status = 'warning'
        predResult.Title = `${(results*100).toFixed(1)}% Warning`
        predResult.subTitle = 'Be alert to the risk of developing diabetes'
      }


      console.log(parseFloat('22.4354365'))
    })
  }
}




onMounted(methods.fetchDiabetesData)

</script>

<style scoped lang="scss">
.border-box{
  position: relative;
  margin:300px auto;
  width:400px;
  height:300px;
  background: rgba(1, 19, 67, 0.8);
  border: 2px solid #00a1ff;
  border-radius: 8px;
}
.border-box::before {
  position: absolute;
  top: -2px;
  bottom: -2px;
  left: 30px;
  width: calc(100% - 60px);
  content: "";
  border-top: 2px solid #016886;
  border-bottom: 2px solid #016886;
  z-index: 0;
}
.border-box::after {
  position: absolute;
  top: 30px;
  right: -2px;
  left: -2px;
  height: calc(100% - 60px);
  content: "";
  border-right: 2px solid #016886;
  border-left: 2px solid #016886;
  z-index: 0;
}
.border-box p{
  line-height:100px;
  text-align: center;
  color:#00a1ff;
}

.main {
  width: 100%;
  height: calc(100vh - 64px);
  display: grid;
  grid-column-gap: 20px;
  padding: 20px;
  grid-template-columns: minmax(200px, 22%) 1fr;
  .card-container {
    //display: grid;
    //grid-template-columns: minmax(180px, 20%) 1fr;
  }
  //.left {
  //  max-height: 100%;
  //  margin: 10px 20px;
  //
  //}
  //.right {
  //  height: 500px;
  //  display: grid;
  //  grid-template-columns: 100%;
  //  grid-column-gap: 10px;
  //  margin: 10px 10px 10px 0;
  //  .up {
  //    width: 100%;
  //    margin-bottom: 10px;
  //    //height: 35%;
  //  }
  //  .down {
  //    width: 100%;
  //    //height: 35%;
  //  }
  //
  //}
}

</style>