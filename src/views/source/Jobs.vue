<template>
  <div class="search">
      <a-form :model="query"
              name="basic">
        <a-row :gutter="20">
<!--          <a-tree-->

<!--              checkable-->
<!--              :tree-data="treeData"-->
<!--          >-->
<!--            <template #title="{ title, key }">-->
<!--              <span v-if="key === '0-0-1-0'" style="color: #1890ff">{{ title }}</span>-->
<!--              <template v-else>{{ title }}</template>-->
<!--            </template>-->
<!--          </a-tree>-->
          <a-col :span="4">
            <a-form-item label="地点:" name="city">
              <a-input v-model:value="query.city"></a-input>
            </a-form-item>
          </a-col>

        <a-col :span="4">
          <a-form-item label="岗位:" name="title">
            <a-input v-model:value="query.title"></a-input>
          </a-form-item>
        </a-col>
          <a-col :span="4">
            <a-button type="primary" @click="onsubmit">查询</a-button>
          </a-col>
        </a-row>
      </a-form>
  </div>
  <a-layout-content>
    <a-card style="margin:auto 50px">
    <a-table
        :columns="columns"
        :data-source="data"
        :pagination="false"
        size="small"
        :scroll="{ y: 540 }"
    >
      <template #bodyCell="{ column, record }">
      <template v-if="column.title === 'labels'">
        <span>
          <a-tag
              v-for="(label,index) in record.labels"
              :color="index === 0 ?
               'pink' : index === 1 ?
                'blue' :index === 2?
                 'green': index === 3?
                  'purple':'cyan'"
          >
            {{ label }}
          </a-tag>

        </span>
      </template>
      </template>

    </a-table>
    <a-row justify="end">
      <a-pagination
          style="margin-top: 10px"
          v-model:current="query.currentPage"
          v-model:pageSize="query.pageSize"
          show-size-changer
          show-quick-jumper
          :total="total"
          @change="onShowSizeChange"
      />
    </a-row>
    </a-card>
  </a-layout-content>


</template>

<script>
import Nav from '../common/Nav'
import { ref, reactive, onMounted } from 'vue';
import axios from "axios";
// import mapKey from "mapKey"
import { SettingOutlined, EditOutlined, EllipsisOutlined, InfoCircleOutlined } from '@ant-design/icons-vue';



export default {
  name: "Jobs",
  components: {Nav},
  data() {
    return {
      query: {
        pageSize: 20,
        currentPage: 1,
        city: '',
        title: ''
      },
      isMore: false,
      total: '',
      columns: [
        {
          title: 'Company',
          dataIndex: 'company',
          width: 250,
        },
        {
          title: 'Workplace',
          dataIndex: 'workplace',
          width: 150,
        },
        {
          title: 'Salary',
          dataIndex: 'salary',
          width: 200,
        },
        {
          title: 'title',
          dataIndex: 'title',
          width: 350,
        },
        {
          title: 'labels',
          dataIndex: 'labels',
          maxWidth: 350,
        },
        {
          title: 'time',
          dataIndex: 'create_time',
        },
      ],
      data: [],
      treeData: [],
      hotCity: ['深圳','上海','北京','杭州','苏州','南京',],
    }
  },
  created() {
    // this.getCityData()
    this.fetch_boss_data()
  },
  methods: {
    async fetch_boss_data() {
      const {data: res} = await axios.get('source/jobs/',{params:this.query})
      this.data = res.results.data
      this.total = res.results.total
    },
    onShowSizeChange(current, pageSize) {
      console.log(current, pageSize);
      this.query.currentPage = current
      this.fetch_boss_data()
    },
    moreCity() {
      this.isMore = true
    },
    async onsubmit() {
      const {data: res} = await axios.get('source/jobs/',{params:this.query})
      this.data = res.results.data
      this.total = res.results.total
    }
  }
}
</script>

<style scoped>
  .search {
    margin: 20px 50px;
  }
</style>