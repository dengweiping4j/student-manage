<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-cascades"></i> 角色信息
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <div class="handle-box">
        <el-button type="primary" icon="el-icon-lx-add" @click="handleAdd">新增</el-button>
        <el-input v-model="query.roleName" placeholder="角色名称" class="handle-input mr10"></el-input>
        <el-button type="primary" icon="el-icon-search" @click="search">搜索</el-button>
      </div>
      <el-table :data="tableData" border class="table" ref="multipleTable" header-cell-class-name="table-header">
        <el-table-column prop="roleName" label="角色名称"/>
        <el-table-column prop="roleType" label="类型" align="center"/>
        <el-table-column prop="remark" label="描述" align="center"/>
        <el-table-column prop="crtBy" label="创建人"></el-table-column>
        <el-table-column prop="crtTime" label="创建时间"></el-table-column>
        <el-table-column label="操作" width="180" align="center">
          <template #default="scope">
            <el-button :disabled="scope.row.roleType === '1'" type="text" icon="el-icon-edit" @click="handleEdit(scope.row)">编辑
            </el-button>
            <el-button :disabled="scope.row.roleType === '1'" type="text" icon="el-icon-delete" class="red"
                       @click="handleDelete(scope.row)">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination background layout="total, prev, pager, next" :current-page="pageParam.pageNum"
                       :page-size="pageParam.pageSize" :total="totalElements"
                       @current-change="pageChange"></el-pagination>
      </div>
    </div>

    <!-- 编辑弹出框 -->
    <EditModal
        :modalInfo="modalInfo"
        :form="detail"
        :roleList="roleList"
        :visible="visible"
        @save="save"
        @cancel="close"
    >
    </EditModal>
  </div>
</template>

<script>
import {ref, reactive} from "vue";
import {ElMessage, ElMessageBox} from "element-plus";
import {requestPost, requestDelete} from "/src/api/request";
import EditModal from "./EditModal.vue";
import {requestPut} from "../../../api/request";

export default {
  name: "role",
  components: {
    EditModal,
  },
  methods: {
    /**
     * 获取数据
     * @param query
     * @param pageParam
     */
    queryData() {
      requestPost('system/role/findAll', this.query, this.pageParam).then((res) => {
        if (res.data) {
          this.tableData = res.data.content;
          this.totalElements = res.data.totalElements || 0;
        }
      });
    },

    /**
     * 搜索
     */
    search() {
      this.pageParam.pageNum = 1;
      this.queryData();
    },

    queryRoleChange(value) {
      this.query.roleId = value;
      this.queryData();
    },

    /**
     * 页码变化
     * @param pageNum
     */
    pageChange(pageNum) {
      this.pageParam.pageNum = pageNum;
      this.queryData();
    },

    /**
     * 打开新增窗口
     */
    handleAdd() {
      this.modalInfo = {
        type: 'add',
        title: '新增'
      }
      this.visible = true;
    },

    /**
     * 打开编辑窗口
     * @param index
     * @param row
     */
    handleEdit(row) {
      this.modalInfo = {
        type: 'edit',
        title: '编辑'
      }
      Object.keys(this.detail).forEach((item) => {
        this.detail[item] = row[item];
      });
      this.visible = true;
    },

    /**
     * 关闭窗口
     */
    close() {
      this.visible = false;
    },

    /**
     * 保存
     * @param item
     */
    save(item) {
      if (this.modalInfo.type === 'add') {
        requestPost('system/role/save', item).then((res) => {
          if (res.code === 200) {
            this.visible = false;
            ElMessage.success('保存成功');
            this.queryData();
          } else {
            ElMessage.error('保存失败：' + res.detail);
          }
        });
      } else {
        requestPut('system/role/update', item).then((res) => {
          if (res.code === 200) {
            this.visible = false;
            ElMessage.success('保存成功');
            this.queryData();
          } else {
            ElMessage.error('保存失败：' + res.detail);
          }
        });
      }
    },

    /**
     * 删除
     * @param row
     */
    handleDelete(row) {
      // 二次确认删除
      ElMessageBox.confirm("确定要删除吗？", "提示", {
        type: "warning",
      })
          .then(() => {
            requestDelete('system/role/delete/' + row.id).then((res) => {
              if (res.code === 200) {
                this.visible = false;
                ElMessage.success('删除成功');
                this.pageParam.pageNum = 1;
                this.queryData();
              } else {
                ElMessage.error('删除失败：' + res.detail);
              }
            });
          })
          .catch(() => {
          });
    }
  },
  setup() {
    const pageParam = reactive({
      pageNum: 1,
      pageSize: 10,
    })
    const query = reactive({
      roleName: '',
    });
    const tableData = ref([]);
    const totalElements = ref(0);
    const visible = ref(false);
    const modalInfo = reactive({
      type: 'add',
      title: '新增'
    });

    // 获取表格数据
    const getData = () => {
      requestPost('system/role/findAll', query, pageParam).then((res) => {
        if (res.data) {
          tableData.value = res.data.content;
          totalElements.value = res.data.totalElements || 0;
        }
      });
    };
    getData();

    const roleList = ref([]);
    const getRoleList = () => {
      requestPost('system/role/find').then((res) => {
        if (res.data) {
          roleList.value = res.data;
        }
      });
    };
    getRoleList();

    const detail = reactive({
      id: '',
      roleName: '',
      remark: ''
    });

    return {
      pageParam,
      query,
      tableData,
      roleList,
      detail,
      totalElements,
      visible,
      modalInfo,
    };
  },
};
</script>

<style>
@import "index.css";
</style>
