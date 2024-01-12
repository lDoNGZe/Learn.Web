<template>
  <div class="login-wrap">
    <div
      class="form-wrap"
      :style="{'--color': theme}"
    >
      <div class="login-title">用户登录</div>
      <div class="loginTypeList">
        <div
          @click="changeLoginType(1)"
          :class="loginType === 1 ? 'active' : ''"
          class="loginType"
        >
          账号登录
        </div>
        <div
          @click="changeLoginType(2)"
          :class="loginType === 2 ? 'active' : ''"
          class="loginType"
        >
          验证码登录
        </div>
      </div>
      <!-- 账号登录 -->
      <el-form
        v-show="loginType === 1"
        ref="accountFormRef"
        :model="accountForm"
        :rules="accountFormRule"
      >
        <el-form-item
          label
          prop="userName"
        >
          <el-input
            type="text"
            v-model="accountForm.userName"
            placeholder="请输入用户名"
            prefix-icon="el-icon-user"
          ></el-input>
        </el-form-item>
        <el-form-item
          label
          prop="userPass"
        >
          <el-input
            type="password"
            v-model="accountForm.userPass"
            placeholder="请输入密码"
            prefix-icon="el-icon-lock"
          ></el-input>
        </el-form-item>
        <el-form-item
          label
          prop="verifyCode"
        >
          <div class="verifyCode-wrap">
            <el-input
              type="verifyCode"
              v-model="accountForm.verifyCode"
              placeholder="请输入验证码"
            ></el-input>
            <div class="img-code-box">
              <el-image
                :src="verifyCodeParams.base64CodeImg"
                class="img-code"
                @click="toggleVerifyCode"
              ></el-image>
            </div>
          </div>
        </el-form-item>
        <div class="btn_box">
          <el-button
            type="primary"
            size="medium"
            :loading="loginLoading"
            @click="handleLogin"
            style="width: 100%"
          >登录</el-button>
        </div>
        <div class="logo-box">
          <div class="right-login-link">
            <span class="login-text">没有账号，</span>
            <span
              class="login-link"
              @click="pushPage('/register')"
            >立即注册</span>
          </div>
        </div>
      </el-form>
      <!-- 手机号登录 -->
      <el-form
        v-show="loginType === 2"
        ref="phoneFormRef"
        :model="phoneForm"
        :rules="phoneFormRule"
      >
        <el-form-item
          label
          prop="phone"
        >
          <el-input
            type="text"
            v-model="phoneForm.phone"
            placeholder="请输入手机号"
            prefix-icon="el-icon-mobile-phone"
            @blur="changePhone"
          ></el-input>
        </el-form-item>
        <el-form-item
          label
          prop="verifyCode"
          class="verifyCode"
        >
          <el-input
            type="text"
            v-model="phoneForm.verifyCode"
            placeholder="请输入验证码"
          ></el-input>
          <el-button
            @click="getCode"
            :disabled="verifyCodeBtn"
            class="verifyCodeBtn"
            type="primary"
          >{{ codeBtnText }}</el-button>
        </el-form-item>
        <div class="btn_box">
          <el-button
            type="primary"
            size="medium"
            :loading="loginLoading"
            @click="handleLogin"
            style="width: 100%"
          >登录</el-button>
        </div>
        <div class="logo-box">
          <div class="right-login-link">
            <span class="login-text">没有账号，</span>
            <span
              class="login-link"
              @click="pushPage('/register')"
            >立即注册</span>
          </div>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Went from "@/assets/js/encryption.js";
import { formValidateDiy } from "@/utils/tool";
import { validateMobileNumber } from "@/utils/validate";
import { getSmsCode } from "@/api/user";
import { createLoginVerifyCode, VerifyVerificationCode } from "@/api/user.js";
export default {
  name: "Login",
  data() {
    return {
      loginType: 1,
      loginLoading: false,
      verifyCodeBtn: true,
      redirect: undefined,
      otherQuery: {},
      accountForm: {
        userName: "",
        userPass: "",
        verifyCode: "",
        type: false,
      },
      phoneForm: {
        phone: "",
        verifyCode: "",
      },
      accountFormRule: {
        userName: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        userPass: [{ required: true, message: "请输入密码", trigger: "blur" }],
        verifyCode: [
          { required: true, message: "请输入验证码", trigger: "blur" },
        ],
      },
      phoneFormRule: {
        phone: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          {
            validator: formValidateDiy(
              "validateMobileNumber",
              "手机号格式不正确"
            ),
            trigger: "blur",
          },
        ],
        verifyCode: [
          { required: true, message: "请输入验证码", trigger: "blur" },
        ],
      },
      verifyCodeParams: {
        base64CodeImg: "", // 图形验证码Base64地址
        codeKey: "", // 图形验证码的key
      },
      codeBtnText: "获取验证码",
      timer: null,
      second: 60,
    };
  },
  computed: {
    ...mapState({
      theme: (state) => state.settings.theme,
    }),
  },
  watch: {
    $route: {
      immediate: true,
      handler(route) {
        const query = route.query;
        if (query) {
          this.redirect = query.redirect;
          this.otherQuery = this.getOtherQuery(query);
        }
      },
    },
  },
  created() {
    this.createLoginVerifyCode();
  },
  methods: {
    // 跳转指定页面
    pushPage(url) {
      this.$router.push(url);
    },
    // 切换获取新的图形验证码
    toggleVerifyCode() {
      this.verifyCodeParams = {
        base64CodeImg: "",
        codeKey: "",
      };
      this.createLoginVerifyCode();
    },
    // 获取地址栏的其他query参数
    getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== "redirect") {
          acc[cur] = query[cur];
        }
        return acc;
      }, {});
    },
    // 切换登陆方式
    changeLoginType(type) {
      this.loginType = type;
    },
    // 校验手机号
    changePhone() {
      if (
        validateMobileNumber(this.phoneForm.phone) &&
        this.phoneForm.phone != ""
      ) {
        this.verifyCodeBtn = false;
      }
    },
    // 登录
    login(formName) {
      this.loginLoading = true;
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          let reqParams;
          if (this.loginType === 1) {
            reqParams = {
              account: Went.utility.wCoder.wEncode(this.accountForm.userName),
              sysuserPass: Went.utility.wCoder.wEncode(
                this.accountForm.userPass
              ),
              verifyCode: this.accountForm.verifyCode,
              verifyCodeKey: this.verifyCodeParams.codeKey,
              owiningSubSystem: 0,
              loginType: 0, // pc端登录为0
            };
          } else {
            reqParams = {
              account: this.phoneForm.phone,
              loginMode: 1,
            };
          }

          this.$store
            .dispatch("user/login", reqParams)
            .then(() => {
              this.$router.push({
                path: this.redirect || "/",
              });
              this.loginLoading = false;
            })
            .catch(() => {
              if (this.loginType === 1) {
                this.toggleVerifyCode();
              }
              this.loginLoading = false;
            });
        } else {
          this.loginLoading = false;
          console.log("表单信息输入有误");
        }
      });
    },
    // 获取短信验证码
    async getCode() {
      this.verifyCodeBtn = true;
      this.second = 59;
      // smsType: 0 登录 1 注册 2 修改密码
      const { code, result } = await getSmsCode({
        smsType: 9,
        phone: this.phoneForm.phone,
      });
      if (code === 200) {
        const { codeKey, sendStatus } = result;
        if (sendStatus == 1) {
          this.$message.warning("获取验证码过于频繁");
          this.verifyCodeBtn = false;
          return;
        }
        sessionStorage.setItem("registCodeKey", codeKey);
        // 成功后，设置60s倒计时
        this.second = 60;
        this.timer = setInterval(() => {
          if (this.second-- <= 1) {
            this.second = 60;
            this.codeBtnText = "重新获取验证码";
            this.verifyCodeBtn = false;
            clearInterval(this.timer);
          } else {
            this.codeBtnText = "有效时间剩余：" + this.second + "S";
          }
        }, 1000);
      }
    },
    // 创建图形验证码接口
    async createLoginVerifyCode() {
      const { code, result, msg } = await createLoginVerifyCode({
        width: 100,
        height: 30,
        verifyCodeType: 0,
      });
      if (code === 200) {
        this.verifyCodeParams = result;
      } else {
        this.$message.warning(msg);
      }
    },
    /**
     * 校验图形验证码
     */
    async handleLogin() {
      const verifyCode =
        this.loginType === 1
          ? this.accountForm.verifyCode
          : this.phoneForm.verifyCode;
      const verifyCodeKey =
        this.loginType === 1
          ? this.verifyCodeParams.codeKey
          : sessionStorage.getItem("registCodeKey");
      const reqParams = {
        verifyCode,
        verifyCodeKey,
        verifyCodeType: this.loginType === 1 ? 0 : 1,
      };
      const { code, result } = await VerifyVerificationCode(reqParams);
      if (code === 200 && result) {
        this.login(this.loginType === 1 ? "accountFormRef" : "phoneFormRef");
      } else {
        this.loginLoading = false;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.login-wrap {
  position: relative;
  height: 100%;
  background-color: #1c222a;
  background-image: url("../../assets/photos/beijing.png");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
  .form-wrap {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    box-sizing: border-box;
    width: 375px;
    max-width: 100%;
    overflow: hidden;
    background-color: rgba(0, 0, 0, 0.3);
    padding: 10px;
    .login-title {
      text-align: center;
      font-size: 26px;
      font-family: Microsoft YaHei Regular, Microsoft YaHei Regular-Regular;
      font-weight: 400;
      color: #ffffff;
      letter-spacing: 1px;
      margin-bottom: 28px;
    }
    .loginTypeList {
      padding: 0 20px;
      display: flex;
      margin-bottom: 15px;
      .loginType {
        flex: 1;
        text-align: center;
        font-size: 14px;
        font-family: Microsoft YaHei Regular, Microsoft YaHei Regular-Regular;
        font-weight: 400;
        color: #fefefe;
        cursor: pointer;
      }
      .active {
        color: var(--color);
      }
    }
  }
  .el-form {
    margin: 0 auto;
    padding: 0 10px;
    .el-input--small ::v-deep .el-input__icon {
      font-size: 18px !important;
    }
    /* 表单组件样式 */
    .el-form-item {
      margin-bottom: 20px !important;
      .verifyCode-wrap {
        display: flex;
        align-items: center;
        .img-code-box {
          width: 100px;
          height: 30px;
          margin-left: 12px;
          cursor: pointer;
          .img-code {
            width: 100%;
            height: 100%;
          }
        }
      }
    }
    ::v-deep .verifyCode {
      .el-form-item__content {
        display: flex;
        .verifyCodeBtn {
          margin-left: 15px;
        }
      }
    }
    .btn_box {
      display: flex;
      height: 40px;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;
    }
    .logo-box {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      padding-top: 10px;
      .right-login-link {
        font-size: 14px;
        font-family: Microsoft YaHei Regular, Microsoft YaHei Regular-Regular;
        font-weight: 400;
        .login-text {
          color: #fff;
        }
        .login-link {
          cursor: pointer;
          color: var(--color);
        }
      }
    }
  }
}
</style>
