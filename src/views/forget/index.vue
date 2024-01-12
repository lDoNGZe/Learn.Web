<template>
  <div class="employer-box">
    <div class="logo-box">
      <div class="right-login-link">
        <span
          class="login-link"
          icon="el-icon-back"
          @click="goLogin"
        >返回</span>
      </div>
    </div>
    <div class="register-wrap">
      <div class="top-steps">
        <el-steps
          :active="currentStep"
          align-center
          finish-status="success"
        >
          <el-step
            icon="1"
            title="第一步：输入账号"
          ></el-step>
          <el-step
            icon="1"
            title="第二步：重置密码"
          ></el-step>
          <el-step
            icon="1"
            title="第三步：修改结果"
          ></el-step>
        </el-steps>
      </div>
      <div class="step-form">
        <div
          v-show="currentStep === 1"
          class="account-form-info"
        >
          <el-form
            label-position="left"
            label-width="140px"
            :model="accountForm"
            :rules="accountFormRule"
            ref="accountForm"
          >
            <el-form-item
              label="登录账号："
              prop="sysuserId"
            >
              <el-input
                type="text"
                v-model="accountForm.sysuserId"
                placeholder="请输入登录账号"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="手机号："
              prop="sysuserMP"
            >
              <el-input
                type="text"
                v-model="accountForm.sysuserMP"
                placeholder="请输入11位手机号"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="验证码："
              prop="verifyCode"
            >
              <div class="code-wrap">
                <el-input
                  type="text"
                  v-model="accountForm.verifyCode"
                  placeholder="请输入验证码"
                ></el-input>
                <el-button
                  type="primary"
                  class="code"
                  @click="verifySysuserIDAndSysuserMP"
                  :disabled="!isCanClick"
                >{{ codeBtnText }}</el-button>
              </div>
            </el-form-item>
          </el-form>
        </div>
        <div
          v-show="currentStep === 2"
          class="unit-base-info"
        >
          <el-form
            class="unitForm"
            label-position="left"
            label-width="140px"
            :model="unitForm"
            :rules="unitFormRule"
            ref="unitForm"
          >
            <el-form-item
              label="新密码："
              prop="newPassword"
            >
              <el-input
                type="password"
                show-password
                v-model="unitForm.newPassword"
                placeholder="设置密码必须在8~16位之间，包含数字、字母、符号"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="确认密码："
              prop="confirmPassword"
            >
              <el-input
                type="password"
                show-password
                v-model="unitForm.confirmPassword"
                placeholder="请确认密码"
              ></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div
          v-show="currentStep === 3"
          class="result-info"
        >
          <el-result
            icon="success"
            subTitle="重置密码成功"
          >
            <template slot="extra">
              <el-button
                type="primary"
                style="width: 300px;"
                @click="goLogin"
              >去登录</el-button>
            </template>
          </el-result>
        </div>
        <div class="btn-box">
          <el-button
            v-if="currentStep === 1"
            type="primary"
            class="my-btn"
            @click="handleStep1"
          >下一步</el-button>
          <el-button
            v-if="currentStep === 2"
            type="primary"
            class="my-btn"
            @click="handleStep2"
          >下一步</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Went from "@/assets/js/encryption.js";
import {
  getSmsCode,
  verifySmsCode,
  changePassword,
  VerifySysuserIDAndSysuserMP,
} from "@/api/user";
import { formValidateDiy } from "@/utils/tool";
import { validatePhone } from "@/utils/validate";
export default {
  name: "forget",
  data() {
    const validateConfirmPass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.unitForm.newPassword) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      currentStep: 1,
      accountForm: {
        sysuserId: "",
        sysuserMP: "",
        verifyCode: "",
      },
      unitForm: {
        newPassword: "",
        confirmPassword: "",
      },
      unitFormRule: {
        newPassword: [
          { required: true, message: "请输入新密码", trigger: "blur" },
          {
            validator: formValidateDiy("validatePassword", "密码格式不正确"),
            trigger: "blur",
          },
        ],
        confirmPassword: [
          { required: true, message: "请确认密码", trigger: "blur" },
          {
            validator: formValidateDiy("validatePassword", "密码格式不正确"),
            trigger: "blur",
          },
          {
            validator: validateConfirmPass,
            trigger: "blur",
          },
        ],
      },
      accountFormRule: {
        sysuserId: [
          { required: true, message: "请输入登录账号", trigger: "blur" },
        ],
        sysuserMP: [
          { required: true, message: "请输入11位手机号", trigger: "blur" },
          {
            validator: formValidateDiy("validatePhone", "手机号格式不正确"),
            trigger: "blur",
          },
        ],
        verifyCode: [
          { required: true, message: "请输入验证码", trigger: "blur" },
        ],
      },
      codeBtnText: "获取验证码",
      timer: null,
      second: 60,
    };
  },
  computed: {
    isCanClick() {
      return validatePhone(this.accountForm.sysuserMP) && this.second === 60;
    },
  },
  methods: {
    handleStep1() {
      clearInterval(this.timer);
      this.$refs.accountForm.validate(async (valid) => {
        if (valid) {
          // 1. 判断填写的验证码和从后台获取的验证码是否一致
          const codeKey = sessionStorage.getItem("registCodeKey");
          const { code } = await verifySmsCode({
            codeKey,
            smsCode: this.accountForm.verifyCode,
          });
          if (code === 200) {
            console.log("校验通过");
            this.currentStep = 2;
          }
        } else {
          console.log("信息填写有误!!");
          return false;
        }
      });
    },
    async handleStep2() {
      // 提交新的密码
      this.$refs.unitForm.validate(async (valid) => {
        if (valid) {
          // 提交新的密码
          const { code } = await changePassword({
            sysuserId: Went.utility.wCoder.wEncode(this.accountForm.sysuserId),
            newPassword: Went.utility.wCoder.wEncode(this.unitForm.newPassword),
            changePasswordWay: 0,
          });
          if (code === 200) {
            this.currentStep = 3;
          }
        } else {
          console.log("信息填写有误!!");
          return false;
        }
      });
    },
    // 校验账号和手机号绑定关系
    async verifySysuserIDAndSysuserMP() {
      const { code } = await VerifySysuserIDAndSysuserMP({
        sysuserId: this.accountForm.sysuserId,
        sysuserMP: this.accountForm.sysuserMP,
      });
      if (code === 200) {
        this.getCode();
      }
    },
    // 获取验证码
    async getCode() {
      this.second = 59;
      const { code, result } = await getSmsCode({
        smsType: 9,
        phone: this.accountForm.sysuserId,
      });
      if (code === 200) {
        const { codeKey, sendStatus } = result;
        if (sendStatus == 1) {
          this.$message.warning("获取验证码过于频繁！");
          return;
        }
        sessionStorage.setItem("registCodeKey", codeKey);
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
    goLogin() {
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
  background-image: url("../../assets/photos/logo.png"),
    url("../../assets/photos/beijing.png");
  background-repeat: no-repeat, no-repeat;
  background-size: auto 64px, cover;
  background-position: 30px 40px, center center;
  .register-wrap {
    padding: 127px 162px 92px 158px;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    .top-steps {
      width: 100%;
      height: 112px;
      background: linear-gradient(rgba(0, 39, 106, 0.9) 0%);
      border-radius: 4px;
      margin-bottom: 20px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      ::v-deep .el-step__head {
        &.is-wait,
        &.is-process {
          .el-step__icon.is-icon {
            position: relative;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background-color: rgba(178, 188, 192, 0.6);
            &::before {
              content: "";
              position: absolute;
              left: 50%;
              top: 50%;
              transform: translate(-50%, -50%);
              width: 12px;
              height: 12px;
              border-radius: 50%;
              background-color: rgba(178, 188, 192, 1);
            }
          }
        }
        &.is-success {
          border-color: #0d47a3;
          .el-step__icon.is-icon {
            position: relative;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background-color: rgba(5, 186, 251, 0.6);
            &::before {
              content: "";
              position: absolute;
              left: 50%;
              top: 50%;
              transform: translate(-50%, -50%);
              width: 12px;
              height: 12px;
              border-radius: 50%;
              background-color: rgba(178, 188, 192, 1);
              background-color: rgba(5, 186, 251, 1);
            }
            .el-icon-check {
              display: none;
            }
          }
        }
      }
    }
    .step-form {
      width: 100%;
      flex: 1;
      padding: 40px;
      background: linear-gradient(rgba(0, 39, 106, 0.9) 0%);
      border-radius: 4px;
      display: flex;
      flex-direction: column;
      .btn-box {
        display: flex;
        justify-content: center;
        align-items: center;
        .my-btn {
          width: 502px;
        }
      }
    }
    .account-form-info {
      width: 500px;
      margin: 0 auto;
      padding-top: 40px;
      .el-form-item {
        margin-bottom: 30px;
      }
      .code-wrap {
        display: flex;
        .code {
          margin-left: 30px;
        }
      }
    }
    .unit-base-info {
      padding: 40px;
      .unitForm {
        width: 500px;
        margin: 0 auto;
      }
    }
    .result-info {
      width: 400px;
      margin: 0 auto;
      padding-top: 40px;
      text-align: center;
      ::v-deep .el-result__subtitle {
        p {
          color: #fff;
        }
      }
    }
  }
  .logo-box {
    position: absolute;
    right: 40px;
    top: 44px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    .right-login-link {
      .login-text {
        font-size: 16px;
        font-family: Microsoft YaHei Regular, Microsoft YaHei Regular-Regular;
        font-weight: 400;
        color: #fff;
      }
      .login-link {
        font-size: 16px;
        font-family: Microsoft YaHei Regular, Microsoft YaHei Regular-Regular;
        font-weight: 400;
        color: #05bafb;
        cursor: pointer;
      }
    }
  }
  ::v-deep .el-step__title {
    font-size: 18px;
    font-family: Microsoft YaHei Regular, Microsoft YaHei Regular-Regular;
    font-weight: 400;
    color: #ffffff;
    letter-spacing: 0px;
  }
  ::v-deep .el-step__line {
    background-color: #0d47a3;
  }
  ::v-deep .el-form-item__label {
    font-size: 16px;
    font-family: Microsoft YaHei Regular, Microsoft YaHei Regular-Regular;
    font-weight: 400;
    color: #fefefe;
  }
}
</style>
