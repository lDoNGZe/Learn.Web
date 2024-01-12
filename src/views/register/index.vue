<template>
  <div
    class="employer-box"
    :style="{'--color': theme}"
  >
    <div class="register-wrap">
      <h3 class="title">账号注册</h3>
      <div class="step-form">
        <div class="account-form-info">
          <el-form
            label-position="left"
            :model="accountForm"
            :rules="accountFormRule"
            ref="accountRef"
          >
            <el-form-item prop="userName">
              <el-input
                prefix-icon="el-icon-user"
                type="text"
                v-model="accountForm.userName"
                placeholder="账号名:3-14位字母、数字、汉字或下划线字符组成"
              ></el-input>
            </el-form-item>
            <el-form-item prop="account">
              <el-input
                type="text"
                prefix-icon="el-icon-mobile-phone"
                v-model="accountForm.account"
                placeholder="请输入11位手机号"
              ></el-input>
            </el-form-item>
            <el-form-item prop="verifyCode">
              <div class="code-wrap">
                <el-input
                  type="text"
                  v-model="accountForm.verifyCode"
                  placeholder="请输入验证码"
                ></el-input>
                <el-button
                  type="primary"
                  class="code"
                  @click="getCode"
                  :disabled="!isCanClick"
                >{{ codeBtnText }}</el-button>
              </div>
            </el-form-item>
            <el-form-item prop="password">
              <el-input
                type="password"
                prefix-icon="el-icon-lock"
                show-password
                v-model="accountForm.password"
                placeholder="密码必须在8~16位之间,包含数字、字母、符号"
              ></el-input>
            </el-form-item>
            <el-form-item prop="confirmPassword">
              <el-input
                type="password"
                prefix-icon="el-icon-lock"
                show-password
                v-model="accountForm.confirmPassword"
                placeholder="请确认密码"
              ></el-input>
            </el-form-item>
          </el-form>
          <div class="btn-box">
            <el-button
              type="primary"
              size="medium"
              class="my-btn"
              @click="handleRegister"
            >
              立即注册
            </el-button>
            <div class="logo-box">
              <div class="right-login-link">
                <span class="login-text">已有账号，</span>
                <span
                  class="login-link"
                  @click="goLogin"
                >立即登录</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Went from "@/assets/js/encryption.js";
import { formValidateDiy } from "@/utils/tool";
import { validatePhone } from "@/utils/validate";
import { getSmsCode, VerifyVerificationCode, Register } from "@/api/user";

export default {
  name: "register",
  data() {
    const validateConfirmPass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.accountForm.password) {
        callback(new Error("两次输入密码不一致"));
      } else {
        callback();
      }
    };
    return {
      accountForm: {
        userName: "",
        account: "",
        verifyCode: "",
        password: "",
        confirmPassword: "",
      },
      accountFormRule: {
        userName: [
          { required: true, message: "请输入账号名", trigger: "blur" },
          {
            validator: formValidateDiy("validateUserName", "账号名格式不正确"),
            trigger: "blur",
          },
        ],
        account: [
          { required: true, message: "请输入11位手机号", trigger: "blur" },
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
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            validator: formValidateDiy("validatePassword", "密码格式不正确"),
            trigger: "blur",
          },
        ],
        confirmPassword: [
          { required: true, message: "请确认密码", trigger: "blur" },
          {
            validator: validateConfirmPass,
            trigger: "blur",
          },
        ],
      },
      codeBtnText: "获取验证码",
      timer: null,
      second: 60,
    };
  },
  computed: {
    // 获取验证码按钮是否可以点击
    isCanClick() {
      return validatePhone(this.accountForm.account) && this.second === 60;
    },
    ...mapState({
      theme: (state) => state.settings.theme,
    }),
  },
  methods: {
    /**
     * 立即注册
     */
    handleRegister() {
      clearInterval(this.timer);
      this.$refs.accountRef.validate(async (valid) => {
        if (valid) {
          const codeKey = sessionStorage.getItem("codeKey");
          const { code, result, message } = await VerifyVerificationCode({
            verifyCodeKey: codeKey,
            verifyCode: this.accountForm.verifyCode,
            verifyCodeType: 1,
          });
          if (code === 200 && result) {
            this.createAccount();
          } else {
            this.$message.warning(message);
          }
        } else {
          console.log("账号信息填写有误");
          return false;
        }
      });
    },
    /**
     * 注册账号
     */
    async createAccount() {
      const reqParams = {
        sysuserID: this.accountForm.userName,
        sysuserMP: this.accountForm.account,
        password: Went.utility.wCoder.wEncode(this.accountForm.password),
        messageVerifyCode: this.accountForm.verifyCode,
      };
      const { code, message } = await Register(reqParams);
      if (code === 200) {
        this.$message.success(message);
        this.goLogin();
      }
    },
    /**
     * 获取验证码
     */
    async getCode() {
      this.second = 59;
      const { code, result } = await getSmsCode({
        smsType: 9,
        phone: this.accountForm.account,
      });
      if (code === 200) {
        const { codeKey, sendStatus } = result;
        if (sendStatus == 1) {
          this.$message.warning("获取验证码过于频繁！");
          return;
        }
        sessionStorage.setItem("codeKey", codeKey);
        // 成功后，设置60s倒计时
        this.second = 60;
        this.timer = setInterval(() => {
          if (this.second-- <= 1) {
            this.second = 60;
            this.codeBtnText = "重新获取验证码";
            clearInterval(this.timer);
          } else {
            this.codeBtnText = "有效时间剩余：" + this.second + "S";
          }
        }, 1000);
      }
    },
    /**
     * 去登录
     */
    goLogin() {
      if (sessionStorage.getItem("approvalStatus")) {
        sessionStorage.removeItem("approvalStatus");
      }
      // 清除之前的登录信息，重新登录
      this.$store.dispatch("user/resetToken").then(() => {
        this.$router.push("/login");
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.employer-box {
  position: relative;
  min-height: 100%;
  background-color: #1c222a;
  background-image: url("../../assets/photos/beijing.png");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
  .register-wrap {
    position: absolute;
    transform: translateY(-50%);
    box-sizing: border-box;
    width: 375px;
    max-width: 100%;
    overflow: hidden;
    background-color: rgba(0, 0, 0, 0.3);
    box-shadow: 0px 1px 5px 0px rgba(32, 49, 80, 0.1);
    border-radius: 4px;
    padding: 6px;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    .title {
      display: block;
      color: #fff;
      font-size: 24px;
      text-align: center;
      height: 40px;
      line-height: 40px;
    }
    .step-form {
      width: 100%;
      padding: 15px 10px;
      box-sizing: border-box;
      .my-btn {
        width: 100%;
      }
    }
    .account-form-info {
      .el-form-item {
        margin-bottom: 20px;
      }
      .code-wrap {
        display: flex;
        .code {
          margin-left: 20px;
        }
      }
    }
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
</style>