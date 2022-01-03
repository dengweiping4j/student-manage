<template>
  <el-dialog :title="modalInfo.title" v-model="visible" width="30%">
    <el-form label-width="70px">

      <el-form-item label="用户名">
        <el-input
            v-model="form.userName"
            placeholder="请输入内容"
            maxlength="10"
            :disabled="modalInfo.type === 'edit'"
            show-word-limit
        >
        </el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input
            show-password
            v-model="form.password"
            placeholder="请输入密码"
            :disabled="modalInfo.type === 'edit'"
        >
        </el-input>
      </el-form-item>
      <el-form-item label="角色">
        <el-select v-model="form.roleId" placeholder="请选择用户角色" class="handle-select mr10" @change="roleChange">
          <el-option
              v-for="item in roleList"
              :key="item.id"
              :label="item.roleName"
              :value="item.id"
          >
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
           <el-button @click="cancel">取 消</el-button>
         <el-button type="primary" @click="save">确 定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
export default {
  props: ["modalInfo", "visible", "form", "roleList"],
  data() {
    return {
      roleList: this.roleList,
      form: this.form
    }
  },
  computed: {
    form: function () {
      return this.form
    },
    roleList: function () {
      return this.roleList
    }
  },
  methods: {
    cancel() {
      this.$emit('cancel');
    },
    save() {
      this.$emit('save', this.form);
    },
    roleChange(value) {
      this.form.roleId = value
    }
  }
};
</script>
