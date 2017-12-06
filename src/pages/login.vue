<template lang="pug">
  div
    Form.login(:label-width="100")
      Form-item(label="请输入姓名")
        Input(v-model="nickname")
      Form-item
        Button(type="primary", @click="submit") 确定
</template>

<script>
  import apiAuth from '@/api/auth';

  export default {
    data() {
      return {
        nickname: '',
      };
    },
    created() {
      console.log(this.$store, this.$router);
    },
    methods: {
      submit() {
        apiAuth.login()
          .then((data) => {
            console.log(data);
          })
          .catch((err) => {
            this.$Message.error(err);
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
