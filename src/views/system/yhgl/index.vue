<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-cascades"></i> 用户信息
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <div class="handle-box">
        <el-button type="primary" icon="el-icon-lx-add" @click="handleAdd">新增</el-button>
        <el-select v-model="query.roleId" placeholder="角色" class="handle-select mr10">
          <el-option key="1" label="全部" value=""></el-option>
          <el-option key="2" label="学生" value="1001"></el-option>
          <el-option key="3" label="教师" value="1003"></el-option>
          <el-option key="4" label="管理员" value="1004"></el-option>
        </el-select>
        <el-input v-model="query.userName" placeholder="用户名" class="handle-input mr10"></el-input>
        <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
      </div>
      <el-table :data="tableData" border class="table" ref="multipleTable" header-cell-class-name="table-header">
        <el-table-column prop="userName" label="用户名"/>
        <el-table-column label="头像(查看大图)" align="center">
          <template #default="scope">
            <el-image class="table-td-thumb" :src="scope.row.thumb" :preview-src-list="[scope.row.thumb]">
            </el-image>
          </template>
        </el-table-column>
        <el-table-column prop="roleName" label="角色" align="center"/>

        <el-table-column prop="crtTime" label="注册时间"></el-table-column>
        <el-table-column label="操作" width="180" align="center">
          <template #default="scope">
            <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)">编辑
            </el-button>
            <el-button type="text" icon="el-icon-delete" class="red"
                       @click="handleDelete(scope.$index, scope.row)">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination background layout="total, prev, pager, next" :current-page="pageParam.pageNum"
                       :page-size="pageParam.pageSize" :total="totalElements"
                       @current-change="handlePageChange"></el-pagination>
      </div>
    </div>

    <!-- 编辑弹出框 -->
    <edit
        :title="title"
        :form="detail"
        :visible="visible.show"
        @save="save"
        @cancel="close"></edit>
  </div>
</template>

<script>
import {ref, reactive} from "vue";
import {ElMessage, ElMessageBox} from "element-plus";
import {fetchData, requestPost, requestGet} from "/src/api/request";
import edit from "./edit.vue";

export default {
  name: "basic-student",
  components: {
    edit,
  },
  methods: {
    close() {
      this.visible.show = false;
    },
    save(item) {
      requestPost('system/user/register', item).then((res) => {
        if (res.code === 200) {
          this.visible.show = false;
          ElMessage.success('保存成功');
        } else {
          console.log(res)
          ElMessage.error('保存失败：' + res.detail);
        }
      });
    }
  },
  setup() {
    const pageParam = reactive({
      pageNum: 1,
      pageSize: 10,
    })

    const query = reactive({
      userName: '',
      roleId: ''
    });

    const tableData = ref([]);
    const totalElements = ref(0);

    // 获取表格数据
    const getData = () => {
      requestPost('system/user/findAll', query, pageParam).then((res) => {
        if (res.data) {
          tableData.value = res.data.content;
          totalElements.value = res.data.totalElements || 0;
        }
      });
    };

    getData();

    // 查询操作
    const handleSearch = () => {
      pageParam.pageNum = 1;
      getData();
    };

    // 分页导航
    const handlePageChange = (val) => {
      pageParam.pageNum = val;
      getData();
    };

    // 删除操作
    const handleDelete = (index) => {
      // 二次确认删除
      ElMessageBox.confirm("确定要删除吗？", "提示", {
        type: "warning",
      })
          .then(() => {
            ElMessage.success("删除成功");
            tableData.value.splice(index, 1);
          })
          .catch(() => {
          });
    };

    // 表格编辑时弹窗和保存
    const visible = reactive({
      show: false
    });

    let title = '新增';
    const handleAdd = () => {
      title = '新增';
      visible.show = true;
    }

    let idx = -1;
    const detail = reactive({
      userName: ''
    });
    const handleEdit = (index, row) => {
      title = '修改';
      idx = index;
      Object.keys(detail).forEach((item) => {
        detail[item] = row[item];
      });
      visible.show = true;
    };

    console.log('detail', detail);

    return {
      pageParam,
      query,
      tableData,
      detail,
      totalElements,
      visible,
      title,
      handleSearch,
      handlePageChange,
      handleDelete,
      handleEdit,
      handleAdd
    };
  },
};
</script>

<style>
@import "index.css";
</style>
