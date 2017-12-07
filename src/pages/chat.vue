<template lang="pug">
  div
    div.header
      h2 chat with webSocket
    div.body
      Row(type="flex", :gutter="24" align="top")
        Col(span="16")
          Card(padding="0")
            h4(slot="title") 聊天列表
            div.card-body
              div.messageList
                Row(v-for="(message, index) in messageList", :key="index")
                  template(v-if="message.id !== authStore.userInfo.id")
                    Col(span="6")
                      img(:src="getHeadImg(message.image)")
                      span {{message.nickname}}
                    Col(span="18")
                      pre.text-left {{message.message}}
                  template(v-else)
                    Col(span="18")
                      pre.text-right {{message.message}}
                    Col(span="6")
                      img(:src="getHeadImg(message.image)")
                      span {{message.nickname}}
              div.input
                Input(v-model.trim="message", @keyup.enter.native="sendMsg", placeholder="请输入...")
                  Button(slot="append", type="primary", @click="sendMsg") 发送
        Col(span="8")
          Card(padding="0")
            h4(slot="title") 用户列表
            div.card-body
              div.userList
                Row(v-for="user in userList", :key="user.id", type="flex", align="middle")
                  Col(span="6")
                    img(:src="getHeadImg(user.image)")
                  Col(span="18")
                    span {{user.nickname}}
</template>

<script>
  import { mapState } from 'vuex';

  export default {
    computed: {
      ...mapState(['authStore']),
    },
    data() {
      return {
        message: '',

        socket: null,
        userList: [],
        messageList: [],
      };
    },
    created() {
      if (!this.socket) {
        this.createSocket();
      }
    },
    methods: {
      createSocket() {
        const domain = window.location.hostname;
        const socket = new WebSocket(`ws://${domain}:8888`);

        this.socket = socket;

        socket.addEventListener('message', (event) => {
          const eventData = JSON.parse(event.data);
          const { type, data } = eventData;
          switch (type) {
            case 'userIn':
              return this.handleUserIn(data);
            case 'userLeft':
              return this.handleUserLeft(data);
            case 'message':
              return this.handleMessageIn(data);
            default:
              return this.$Message.error('预料之外的数据类型');
          }
        });
      },
      handleUserIn({ userInfo, userList }) {
        this.userList = userList;
        this.$Notice.info({
          title: `${userInfo.nickname}进入了房间`,
        });
      },
      handleUserLeft({ userInfo, userList }) {
        this.$Notice.info({
          title: `${userInfo.nickname}离开了房间`,
        });
        this.userList = userList;
      },
      handleMessageIn(data) {
        this.messageList.push(data);
      },
      getHeadImg(num) {
        return `/static/headImg/${num}.jpg`;
      },
      sendMsg() {
        if (!this.message) {
          this.$Message.warning('无内容可发送');
        } else {
          this.socket.send(this.message);
          this.message = '';
        }
      },
    },
  };
</script>

<style
  lang="scss"
  scoped
>
  .header {
    height: 200px;
    background: linear-gradient(45deg, #020031 0, #6d3353 100%);
    color: #fff;

    h2 {
      font-size: 36px;
      line-height: 200px;
    }

  }

  .text-left {
    text-align: left;
  }

  .text-right {
    text-align: right;
  }

  .body {
    max-width: 1280px;
    min-width: 880px;
    margin: 0 auto;
    padding: 20px 40px;

    .card-body {
      overflow: hidden;
      height: 55vh;
      position: relative;
      min-height: 400px;

      img {
        width: 35px;
        height: 35px;
        padding: 5px;
        vertical-align: middle;
      }

      .userList {
        text-align: left;
        height: 100%;
        overflow: auto;
        padding: 16px;
      }

      .messageList {
        padding: 16px;
        height: 100%;
        overflow: auto;
      }

      pre {
        margin: 7px 0;
      }

      .input {
        position: absolute;
        width: 96%;
        bottom: 5px;
        left: 50%;
        transform: translateX(-50%);
      }
    }
  }
</style>
