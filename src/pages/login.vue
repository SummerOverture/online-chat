<template lang="pug">
  div
    Form.login(:label-width="100", action="javascript:void(0)", :model="form", ref="form", :rules="ruleForm")
      Form-item(label="请输入姓名", prop="nickname")
        Input(v-model.trim="form.nickname", @on-enter="submit")
      Form-item
        Button(type="primary", :loading="loading", @click="submit") 确定
</template>

<script>
  import store from '@/store';
  import apiAuth from '@/api/auth';

  export default {
    data() {
      return {
        loading: false,
        form: {
          nickname: '',
        },
        ruleForm: {
          nickname: { required: true, message: '不能为空', trigger: 'blur' },
        },
      };
    },
    created() {
    },
    methods: {
      handleSubmit() {
        alert(1);
      },
      submit() {
        this.$refs.form.validate((valid) => {
          if (!valid) {
            this.$Message.error('请先填写好表单后进行提交');
          } else {
            this.login();
          }
        });
      },
      login() {
        this.loading = true;
        apiAuth.login({ nickname: this.form.nickname })
          .then((data) => {
            store.commit('setAuthState', 200);
            store.commit('setUserInfo', data);

            this.$router.replace('/');
          })
          .catch((err) => {
            this.$Message.error(err);
          })
          .then(() => {
            this.loading = false;
          });
      },
    },
  };
</script>

<style
  lang="scss"
  scoped
>

  .login {
    width: 350px;
    margin: 0 auto;
    margin-top: 200px;
  }
</style>
