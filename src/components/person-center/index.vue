<template>
  <div
    class="wrap"
    :class="[navStyleModel === 1 ? 'right-style' : '', isCollapse ? 'isCollapse' : '', device === 'mobile' ? 'mobile-style' : '']"
  >
    <el-dropdown
      size="medium"
      placement="bottom-end"
    >
      <span class="userInfo">
        {{ sysuserName || '未知用户' }}
        <i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item @click.native="openPerCenter">个人中心</el-dropdown-item>
        <el-dropdown-item @click.native="logout">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <!-- 个人中心 -->
    <el-dialog
      v-if="dialogVisible"
      :append-to-body="true"
      title="个人中心"
      :visible.sync="dialogVisible"
      width="700px"
    >
      <!-- 修改密码 -->
      <el-dialog
        v-if="passwordVisible"
        :append-to-body="true"
        title="修改密码"
        :visible.sync="passwordVisible"
        width="500px"
      >
        <el-form
          :model="passForm"
          :rules="passFormRules"
          ref="PassForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item
            label="原密码："
            prop="oldPassword"
          >
            <el-input
              type="password"
              show-password
              v-model="passForm.oldPassword"
              placeholder="请输入当前密码"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="新密码："
            prop="newPassword"
          >
            <el-input
              type="password"
              show-password
              v-model="passForm.newPassword"
              placeholder="8-16位，包含数字、字母、符号"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="确认密码："
            prop="confirmPassword"
          >
            <el-input
              type="password"
              show-password
              v-model="passForm.confirmPassword"
              placeholder="请确认密码"
            ></el-input>
          </el-form-item>
        </el-form>
        <div
          slot="footer"
          style="display: flex; justify-content: flex-end; align-items: center"
        >
          <el-button
            size="mini"
            type="primary"
            @click="confirmPassword('PassForm')"
          >确定</el-button>
          <el-button
            size="mini"
            @click="passwordVisible = false"
          >取消</el-button>
        </div>
      </el-dialog>
      <!-- 修改手机号-验证手机号 -->
      <el-dialog
        v-if="verPhoneVisible"
        :append-to-body="true"
        :title="dialogTitle"
        :visible.sync="verPhoneVisible"
        width="500px"
      >
        <!-- 验证旧手机号 -->
        <template v-if="phoneForm.oldPhone">
          <el-form
            :model="phoneForm"
            :rules="phoneFormRules"
            ref="phoneForm"
            label-width="100px"
            class="demo-ruleForm"
          >
            <el-form-item
              label="原手机号："
              prop="oldPhone"
            >
              <el-input
                v-model="phoneForm.oldPhone"
                disabled
              ></el-input>
            </el-form-item>
            <el-form-item
              label="验证码："
              prop="verifyCode"
            >
              <div class="code-wrap">
                <el-input
                  type="text"
                  v-model="phoneForm.verifyCode"
                  placeholder="请输入验证码"
                ></el-input>
                <el-button
                  size="mini"
                  type="primary"
                  class="code"
                  @click="getCode(phoneForm.oldPhone)"
                  :disabled="!isCanClick"
                >{{ codeBtnText }}</el-button>
              </div>
            </el-form-item>
            <div class="tips">若原手机号已停用，请联系管理员获取更多帮助</div>
          </el-form>
          <div
            slot="footer"
            style="display: flex; justify-content: flex-end; align-items: center"
          >
            <el-button
              size="mini"
              type="primary"
              @click="next"
            >下一步</el-button>
            <el-button
              size="mini"
              @click="verPhoneVisible = false"
            >取消</el-button>
          </div>
        </template>
        <!-- 绑定新手机号 -->
        <template v-else>
          <el-form
            :model="bindPhoneForm"
            :rules="bindPhoneFormRules"
            ref="bindPhoneForm"
            label-width="100px"
            class="demo-ruleForm"
          >
            <el-form-item
              label="手机号："
              prop="phone"
            >
              <el-input
                v-model="bindPhoneForm.phone"
                placeholder="请输入手机号"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="验证码："
              prop="verifyCode"
            >
              <div class="code-wrap">
                <el-input
                  type="text"
                  v-model="bindPhoneForm.verifyCode"
                  placeholder="请输入验证码"
                ></el-input>
                <el-button
                  size="mini"
                  type="primary"
                  class="code"
                  @click="getCode(bindPhoneForm.phone)"
                  :disabled="!isCanClick"
                >{{ codeBtnText }}</el-button>
              </div>
            </el-form-item>
          </el-form>
          <div
            slot="footer"
            style="display: flex; justify-content: flex-end; align-items: center"
          >
            <el-button
              size="mini"
              type="primary"
              @click="confrimBindPhone"
            >确定</el-button>
            <el-button
              size="mini"
              @click="verPhoneVisible = false"
            >取消</el-button>
          </div>
        </template>
      </el-dialog>
      <!-- 修改账号 -->
      <el-dialog
        :append-to-body="true"
        title="修改账号"
        :visible.sync="modifyAccountVisible"
        width="500px"
      >
        <el-alert
          title="一个账号一年仅能修改一次"
          type="info"
          show-icon
          :closable="false"
          style="margin-bottom: 10px;"
        >
        </el-alert>
        <el-form
          :model="accountForm"
          :rules="accountFormRules"
          ref="phoneForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item
            label="账号："
            prop="newSysuserId"
          >
            <el-input v-model="accountForm.newSysuserId"></el-input>
          </el-form-item>
          <el-form-item
            label="确认密码："
            prop="password"
          >
            <el-input
              type="password"
              show-password
              v-model="accountForm.password"
              placeholder="请确认密码"
            ></el-input>
          </el-form-item>
        </el-form>
        <div
          slot="footer"
          style="display: flex; justify-content: flex-end; align-items: center"
        >
          <el-button
            size="mini"
            type="primary"
            @click="modifyAccount(accountForm)"
          >确定</el-button>
          <el-button
            size="mini"
            @click="modifyAccountVisible = false"
          >取消</el-button>
        </div>
      </el-dialog>
      <!-- 验证手机号 -->
      <el-dialog
        v-if="verVisible"
        :append-to-body="true"
        title="验证手机号"
        :visible.sync="verVisible"
        width="500px"
      >
        <!-- 验证旧手机号 -->
        <el-form
          :model="verForm"
          :rules="verFormRules"
          ref="verForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item
            label="原手机号："
            prop="oldPhone"
          >
            <el-input
              v-model="verForm.oldPhone"
              disabled
            ></el-input>
          </el-form-item>
          <el-form-item
            label="验证码："
            prop="verifyCode"
          >
            <div class="code-wrap">
              <el-input
                type="text"
                v-model="verForm.verifyCode"
                placeholder="请输入验证码"
              ></el-input>
              <el-button
                size="mini"
                type="primary"
                class="code"
                @click="getCode(verForm.oldPhone)"
                :disabled="!isCanClick"
              >{{ codeBtnText }}</el-button>
            </div>
          </el-form-item>
        </el-form>
        <div
          slot="footer"
          style="display: flex; justify-content: flex-end; align-items: center"
        >
          <el-button
            size="mini"
            type="primary"
            @click="verConfirmPhone"
          >确定</el-button>
          <el-button
            size="mini"
            @click="verVisible = false"
          >取消</el-button>
        </div>
      </el-dialog>
      <div class="personal-center-wrap">
        <div class="center-item">
          <div class="center-item-title">基本信息</div>
          <div class="center-item-form">
            <div class="center-item-form-item">
              <span class="form-item-label">姓名</span>
              <span class="form-item-value">
                {{ personalInfo.sysuserName }}
              </span>
            </div>
            <div class="center-item-form-item">
              <span class="form-item-label">单位</span>
              <span class="form-item-value">{{ personalInfo.eprName }}</span>
            </div>
            <div class="center-item-form-item">
              <span class="form-item-label">账号ID</span>
              <span class="form-item-value">{{ personalInfo.sysuserId }}</span>
            </div>
          </div>
        </div>
        <div class="center-item">
          <div class="center-item-title">登录信息</div>
          <div class="center-item-form">
            <div class="center-item-form-item">
              <span class="form-item-label">账号</span>
              <span class="form-item-value">{{ personalInfo.sysuserId }}</span>
              <el-button
                type="text"
                @click="accountClick"
              >修改</el-button>
            </div>
            <div class="center-item-form-item">
              <span class="form-item-label">手机号</span>
              <span class="form-item-value">{{
                personalInfo.sysuserMP || "您还未绑定手机号，请完善信息"
              }}</span>
              <el-button
                type="text"
                @click="modifyPhone"
              >{{
                personalInfo.sysuserMP ? "修改" : "绑定"
              }}</el-button>
              <el-button
                v-show="!personalInfo.isPhoneNumberConfirmed"
                type="text"
                @click="verPhone"
              >验证</el-button>
            </div>
            <div class="center-item-form-item">
              <span class="form-item-label">密码</span>
              <span class="form-item-value">**************</span>
              <el-button
                type="text"
                @click="modifyPassword"
              >修改</el-button>
            </div>
          </div>
        </div>
        <!-- <div class="center-item">
          <div class="center-item-title">消息设置</div>
          <div class="center-item-form">
            <div class="center-item-form-item">
              <span class="form-item-label">消息声音提醒</span>
              <el-switch
                v-model="personalInfo.isVoiceRemind"
                active-color="#37c8fc"
                inactive-color="#375ccb"
                @change="switchChange"
              ></el-switch>
            </div>
          </div>
        </div> -->
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Went from "@/assets/js/encryption.js";
import { formValidateDiy } from "@/utils/tool";
import { validatePhone } from "@/utils/validate";
import {
  getPersonalCenter,
  changePassword,
  getSmsCode,
  VerifyVerificationCode,
  editVoiceRemind,
  editUserPhoneNumber,
  EditUserAccount,
} from "@/api/user";
import audio from "@/assets/audio/alert.mp3";
import { mapGetters, mapState } from "vuex";

export default {
  props: {
    navStyleModel: {
      type: Number,
    },
    isCollapse: {
      type: Boolean,
    },
  },
  data() {
    const validateConfirmPass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.passForm.newPassword) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      verVisible: false,
      // 修改账号弹窗显示
      modifyAccountVisible: false,
      audio,
      dialogVisibleDetail: false,
      handbookVisible: false,
      fileList: [],
      detailData: {},
      dialogTitle: "",
      codeBtnText: "获取验证码",
      timer: null,
      second: 60,
      codeKey: "",
      accountForm: {
        newSysuserId: "",
        password: "",
      },
      bindPhoneForm: {
        phone: "",
        verifyCode: "",
      },
      phoneForm: {
        oldPhone: "",
        verifyCode: "",
      },
      verForm: {
        oldPhone: "",
        verifyCode: "",
      },
      passForm: {
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      },
      accountFormRules: {
        newSysuserId: [
          { required: true, message: "请输入账号名", trigger: "blur" },
        ],
        password: [
          { required: true, message: "请确认密码", trigger: "blur" },
          {
            validator: formValidateDiy("validatePassword", "密码格式不正确"),
            trigger: "blur",
          },
        ],
      },
      bindPhoneFormRules: {
        phone: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          {
            validator: formValidateDiy(
              "validateMobileNumber",
              "手机号码格式不正确"
            ),
            trigger: "blur",
          },
        ],
        verifyCode: [
          { required: true, message: "请输入短信验证码", trigger: "blur" },
        ],
      },
      phoneFormRules: {
        oldPhone: [
          { required: true, message: "请输入原手机号", trigger: "blur" },
          {
            validator: formValidateDiy(
              "validateMobileNumber",
              "手机号码格式不正确"
            ),
            trigger: "blur",
          },
        ],
        verifyCode: [
          { required: true, message: "请输入短信验证码", trigger: "blur" },
        ],
      },
      verFormRules: {
        oldPhone: [
          { required: true, message: "请输入原手机号", trigger: "blur" },
          {
            validator: formValidateDiy(
              "validateMobileNumber",
              "手机号码格式不正确"
            ),
            trigger: "blur",
          },
        ],
        verifyCode: [
          { required: true, message: "请输入短信验证码", trigger: "blur" },
        ],
      },
      passFormRules: {
        oldPassword: [
          { required: true, message: "请输入当前密码", trigger: "blur" },
        ],
        newPassword: [
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
      personalInfo: {},
      isNotice: false,
      dialogVisible: false,
      passwordVisible: false,
      verPhoneVisible: false,
      bindPhoneVisible: false,
      activePath: "",
      activeIndex2: "",
      currDateTime: "",
      audio: audio,
      value: "-1",
      pointerArr: [],
      alarmNum: 0,
      voiceHtml: "",
      alarmStyle: null,
      userTypeSystem: 0,
      isFullscreen: false, // 当前是否全屏标识
      pagination: {
        currentPage: 1,
        pageSize: 10,
      },
      loading: false,
      totalItemsCount: 0,
      isFirst: true,
    };
  },
  computed: {
    ...mapState({
      device: (state) => state.app.device,
    }),
    ...mapGetters(["sysuserName", "isVoiceRemind", "userType"]),
    disabled() {
      return this.loading || this.noMore;
    },
    isCanClick() {
      return (
        (validatePhone(this.phoneForm.oldPhone) && this.second === 60) ||
        (validatePhone(this.bindPhoneForm.phone) && this.second === 60) ||
        (validatePhone(this.verForm.oldPhone) && this.second === 60)
      );
    },
  },
  methods: {
    verPhone() {
      this.verForm.oldPhone = this.personalInfo.sysuserMP;
      this.verForm.verifyCode = "";
      this.verVisible = true;
    },
    verConfirmPhone() {
      this.$refs.verForm.validate(async (valid) => {
        if (valid) {
          const { code, result } = await VerifyVerificationCode({
            verifyCode: this.verForm.verifyCode,
            verifyCodeKey: this.codeKey,
            verifyCodeType: 1,
          });
          if (code === 200 && result) {
            const res = await editUserPhoneNumber({
              sysuserMP: this.verForm.oldPhone,
            });
            if (res.code === 200) {
              clearInterval(this.timer);
              this.codeBtnText = "获取验证码";
              this.second = 60;
              this.verForm = {
                oldPhone: "",
                verifyCode: "",
              };
              this.verVisible = false;
              this.$message.success(res.message);
              this.getPersonalCenter();
            }
          }
        } else {
          console.log("表单信息填写错误！");
        }
      });
    },
    confrimBindPhone() {
      this.$refs.bindPhoneForm.validate(async (valid) => {
        if (valid) {
          const { code, message } = await editUserPhoneNumber({
            sysuserMP: this.bindPhoneForm.phone,
          });
          if (code === 200) {
            this.$message.success(message);
            this.codeBtnText = "获取验证码";
            this.second = 60;
            this.bindPhoneForm = {
              phone: "",
              verifyCode: "",
            };
            clearInterval(this.timer);
            this.verPhoneVisible = false;
            this.getPersonalCenter();
          }
        } else {
          console.log("表单信息填写错误！");
        }
      });
    },
    switchChange() {
      this.editVoiceRemind();
    },
    async editVoiceRemind() {
      const { code, message } = await editVoiceRemind();
      if (code === 200) {
        if (this.isVoiceRemind) {
          this.$store.dispatch("user/changeVoiceRemind", false);
        } else {
          this.$store.dispatch("user/changeVoiceRemind", true);
        }
        this.$message.success(message);
      }
    },
    next() {
      this.$refs.phoneForm.validate(async (valid) => {
        if (valid) {
          const { code, result } = await VerifyVerificationCode({
            verifyCode: this.phoneForm.verifyCode,
            verifyCodeKey: this.codeKey,
            verifyCodeType: 1,
          });
          if (code === 200 && result) {
            this.dialogTitle = "绑定新手机号";
            this.codeBtnText = "获取验证码";
            this.second = 60;
            this.phoneForm = {
              oldPhone: "",
              verifyCode: "",
            };
            clearInterval(this.timer);
          }
        } else {
          console.log("表单信息填写错误！");
        }
      });
    },
    // 获取验证码
    async getCode(phone) {
      const { code, result } = await getSmsCode({
        smsType: 9,
        phone,
      });
      if (code === 200) {
        this.codeKey = result.codeKey;
        // 成功后，设置60s倒计时
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
    confirmPassword() {
      this.$refs["PassForm"].validate((valid) => {
        if (valid) {
          this.changePassword();
        } else {
          console.log("表单信息填写错误！");
          return false;
        }
      });
    },
    async changePassword() {
      const { code } = await changePassword({
        sysuserId: Went.utility.wCoder.wEncode(this.personalInfo.sysuserID),
        oldPassword: Went.utility.wCoder.wEncode(this.passForm.oldPassword),
        newPassword: Went.utility.wCoder.wEncode(this.passForm.newPassword),
        changePasswordWay: 1, // 通过旧密码修改
      });
      if (code === 200) {
        this.$message.success("操作成功了！");
        this.passwordVisible = false;
      }
    },
    async getPersonalCenter() {
      const { code, result } = await getPersonalCenter();
      if (code === 200) {
        this.personalInfo = result;
        this.dialogVisible = true;
      }
    },
    /**
     * 修改按钮
     */
    accountClick() {
      const { sysuserId } = this.personalInfo;
      this.accountForm.newSysuserId = sysuserId;
      this.accountForm.password = "";
      this.modifyAccountVisible = true;
    },
    /**
     * 保存修改账号
     */
    async modifyAccount(info) {
      const { code } = await EditUserAccount({
        newSysuserId: info.newSysuserId,
        password: Went.utility.wCoder.wEncode(info.password),
      });
      if (code === 200) {
        this.$message.success("修改账号成功，请重新登录");
        this.modifyAccountVisible = false;
        this.logout();
      }
    },
    /**
     * 修改手机号
     */
    modifyPhone() {
      if (this.personalInfo.sysuserMP) {
        this.dialogTitle = "验证原手机号";
      } else {
        this.dialogTitle = "绑定手机号";
      }
      this.phoneForm.oldPhone = this.personalInfo.sysuserMP;
      this.verPhoneVisible = true;
    },
    modifyPassword() {
      this.passForm = {
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      };
      this.passwordVisible = true;
    },
    openPerCenter() {
      this.showAccount = true;
      this.getPersonalCenter();
    },
    logout() {
      sessionStorage.clear();
      this.voiceHtml = "";
      this.$store.dispatch("user/logout").then(() => {
        this.$router.replace("/login");
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.personal-center-wrap {
  .center-item {
    margin-bottom: 14px;
    .center-item-title {
      font-size: 16px;
      font-family: Microsoft YaHei Regular, Microsoft YaHei Regular-Regular;
      font-weight: 400;
    }
    .center-item-form {
      padding: 10px;
      .center-item-form-item {
        line-height: 40px;
        display: flex;
        align-items: center;
        .form-item-label {
          width: 100px;
          font-size: 14px;
          font-family: Microsoft YaHei Regular, Microsoft YaHei Regular-Regular;
          font-weight: 400;
          margin-right: 20px;
        }
        .form-item-value {
          font-size: 14px;
          font-family: Microsoft YaHei Regular, Microsoft YaHei Regular-Regular;
          font-weight: 400;
          margin-right: 20px;
        }
      }
    }
  }
}
.code-wrap {
  display: flex;
  align-items: center;
  .code {
    margin-left: 30px;
  }
}
.wrap {
  display: inline-block;
  .userInfo {
    font-size: 14px;
    color: #fff;
    margin-left: 14px;
    cursor: pointer;
    height: 50px;
    line-height: 50px;
  }
  &.right-style {
    position: absolute;
    right: 220px;
    top: 0;
    &.isCollapse {
      right: 80px;
    }
    &.mobile-style {
      right: 0;
    }
    .userInfo {
      font-size: 14px;
      height: 37px;
      line-height: 37px;
      color: #555;
    }
  }
}
</style>