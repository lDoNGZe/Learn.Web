<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { MessageBox } from "element-ui";
import { getDiyToken } from "@/utils/auth";
import { getBackApiUrl } from "@/utils/tool";
import { fileRoot } from "@/setting";
const signalR = require("@microsoft/signalr");
// 初始化 socket
export default {
  name: "App",
  data() {
    return {
      isFullscreen: false,
    };
  },
  computed: {
    ...mapState({
      navStyleModel: (state) => state.settings.navStyleModel,
    }),
  },
  created() {
    // const whiteList = ["/login", "/register", "/forget"];
    // const { path } = this.$route;
    // if (whiteList.indexOf(path) == -1) {
    //   this.initWebScoketIo();
    // }
  },
  mounted() {
    this.resizeListener();
  },
  methods: {
    initWebScoketIo() {
      let hubUrl = getBackApiUrl(fileRoot) + "chatHub";
      // 创建 scoket 对象
      const connection = new signalR.HubConnectionBuilder()
        .withUrl(hubUrl)
        .configureLogging(signalR.LogLevel.Information)
        .build();
      this.$store.dispatch("user/initScoket", connection);
      // 声明启动连接方法
      const start = async () => {
        try {
          await connection.start();
          const userId = getDiyToken("userId") || "";
          // invoke 调用中心方法，绑定当前用户连接
          // owiningSubsystem = 执法平台0,科教1 loginType = 0 平台登录
          connection
            .invoke("BindUserConnection", {
              userId,
              loginType: 0,
              owiningSubsystem: 0,
            })
            .then(() => {
              // 监听中心发送信息，前端处理
              connection.on("Show", (data) => {
                console.log("Show信息发送回来了", data);
                if (data) {
                  const res = JSON.parse(data);
                  const { Code, Message } = res;
                  // 账号禁用，强制下线
                  if (Code == 901) {
                    MessageBox.alert(Message, "下线通知", {
                      type: "warning",
                      showConfirmButton: false,
                    });
                    this.$store.dispatch("user/logout").then(() => {
                      this.$router.replace("/login");
                    });
                  } else if (Code == 902) {
                    // 账号其他人登录，被顶下线
                    MessageBox.alert(Message, "下线通知", {
                      type: "warning",
                      showConfirmButton: false,
                    });
                    this.$store.dispatch("user/reLogout").then(() => {
                      this.$router.replace("/login");
                    });
                  }
                }
              });
              connection.on("Ping", (data) => {
                connection
                  .invoke("Ping", {
                    onLineSign: data,
                    userId,
                    loginType: 0,
                    owiningSubsystem: 0,
                  })
                  .then(() => {
                    console.log("Ping信息发送回来了");
                  })
                  .catch((err) => {
                    console.log("Ping错误信息" + err);
                  });
              });
            });
        } catch (err) {
          setTimeout(start, 5000);
        }
      };
      // 关闭时，重新连接
      connection.onclose(() => {
        const userId = getDiyToken("userId") || "";
        if (!userId) return;
        console.log("onclose", userId);
        start();
      });
      // 开启连接
      start();
    },
    resizeListener() {
      window.addEventListener("resize", () => {
        if (!this.getFullscreen()) {
          this.exitFullScreen();
        }
      });
    },
    fullele() {
      return (
        document.fullscreenElement ||
        document.webkitFullscreenElement ||
        document.msFullscreenElement ||
        document.mozFullscreenElement ||
        null
      );
    },
    getFullscreen() {
      return !!(document.webkitIsFullScreen || this.fullele());
    },
    exitFullScreen() {
      this.$store.dispatch("settings/changeSetting", {
        key: "showHeadbar",
        value: true,
      });
      this.$store.dispatch("settings/changeSetting", {
        key: "tagsView",
        value: true,
      });
      this.$store.dispatch("settings/changeSetting", {
        key: "breadcrumbs",
        value: true,
      });
    },
  },
};
</script>
