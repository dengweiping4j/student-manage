<template>
  <el-dialog :title="title" v-model="visible" width="30%">
    <el-form label-width="70px">
      <el-form-item label="用户名">
        <el-input v-model="form.userName" placeholder="请输入内容"></el-input>
      </el-form-item>
      <el-form-item label="角色">
        <el-input v-model="form.orgId" placeholder="请输入内容"></el-input>
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
  props: ["title", "visible", "form"],
  data() {
    return {
      form: this.form,
    }
  },
  computed: {
    form: function () {
      return this.form
    }
  },
  methods: {
    cancel() {
      this.$emit('cancel');
    },
    save() {
      this.$emit('save', {
        userName: this.userName,
        orgId: this.orgId
      });
    }
  }
};
</script>
