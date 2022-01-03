<template>
  <el-dialog :title="modalInfo.title" v-model="visible" width="30%">
    <el-form label-width="70px">

      <el-form-item label="角色名称">
        <el-input
            v-model="form.roleName"
            placeholder="请输入内容"
            maxlength="10"
            show-word-limit
        >
        </el-input>
      </el-form-item>
      <el-form-item label="描述">
        <el-input
            v-model="form.remark"
            placeholder="请输入内容"
            maxlength="100"
            show-word-limit
        >
        </el-input>
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
  props: ["modalInfo", "visible", "form"],
  data() {
    return {
      form: this.form
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
      this.$emit('save', this.form);
    }
  }
};
</script>
