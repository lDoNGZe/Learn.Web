<template>
  <el-dialog
    v-if="dialogVisible"
    title="选取地址"
    append-to-body
    :visible="dialogVisible"
    @close="handleCancel"
  >
    <div class="mapcontainer">
      <div class="mapContent">
        <div
          id="all"
          style="height: 100%"
        >
          <div id="allmap"></div>
        </div>
      </div>
      <div style="padding: 10px 0;">
        <el-input
          disabled
          type="text"
          v-model="insureAdress"
        ></el-input>
      </div>
    </div>
    <div
      slot="footer"
      class="dialog-footer"
    >
      <el-button
        type="primary"
        @click="handleConfirm"
      >确 定</el-button>
      <el-button @click="handleCancel">取 消</el-button>
    </div>
  </el-dialog>
</template>
<script>
import AMapLoader from "@amap/amap-jsapi-loader";
export default {
  name: "Address",
  props: {
    lonAndLat: {
      required: true,
    },
  },
  data() {
    return {
      dialogVisible: false,
      map: null,
      marker: null,
      positionPicker: null,
      insureAdress: "",
      insureAdressLatAndLon: [],
    };
  },
  methods: {
    loadmap() {
      const that = this;
      return new Promise((reslove, reject) => {
        AMapLoader.load({
          key: "b43f1b8df9ac58316a258b616ee41095", // 申请好的Web端开发者Key，首次调用 load 时必填
          // version: "2.0", // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
          plugins: ["AMap.ToolBar", "AMap.Scale"], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
          AMapUI: {
            // 是否加载 AMapUI，缺省不加载
            version: "1.1", // AMapUI 缺省 1.1
            plugins: [], // 需要加载的 AMapUI ui插件
          },
        })
          .then((AMap) => {
            that.map = new AMap.Map("allmap", {
              resizeEnable: true,
              zoom: 100,
              center: this.lonAndLat, //中心点坐标
            });

            //地图控件
            that.map.addControl(new AMap.Scale());
            that.map.addControl(new AMap.ToolBar());
            // that.map.setMapStyle("amap://styles/darkblue");
            that.handlePositionPickerEvent(); //实现地图拖拽选址功能
            that.map.setZoom(140); //设置缩放大小

            reslove();
          })
          .catch((e) => {
            console.log(e, "高德地图加载失败");
            reject(e);
          });
      });
    },
    handlePositionPickerEvent() {
      let that = this;
      if (that.marker) {
        that.map.remove(that.marker);
        that.marker = null;
      }
      // marker添加地图上
      that.marker = new AMap.Marker({
        position: that.lonAndLat, // 位置
      });
      that.map.add(that.marker); // 添加到地图

      // 传入经纬度，设置地图中心点
      that.map.setCenter(this.lonAndLat);
      that.map.setZoom(15);
      AMapUI.loadUI(["misc/PositionPicker"], (PositionPicker) => {
        that.positionPicker = new PositionPicker({
          mode: "dragMap", //拖拽地图
          // mode: "dragMarker", //拖拽图标
          map: that.map,
        });
        that.positionPicker.start(this.lonAndLat); //启动这句控制 地图出现一个maker点，可以移动
        that.positionPicker.on("success", (positionResult) => {
          if (positionResult.address) {
            this.insureAdress = positionResult.address;
            this.insureAdressLatAndLon = [
              positionResult.position.lng,
              positionResult.position.lat,
            ];
          } else {
            this.insureAdress = "";
            this.insureAdressLatAndLon = [];
          }
        });
        that.positionPicker.on("fail", (positionResult) => {
          // 海上或海外无法获得地址信息
          console.log(positionResult);
        });
      });
    },
    handleConfirm() {
      this.$emit("update:selectPosition", {
        insureAdress: this.insureAdress,
        insureAdressLatAndLon: this.insureAdressLatAndLon,
      });
      this.dialogVisible = false;
      this.insureAdress = "";
      this.insureAdressLatAndLon = [];
      this.positionPicker && this.positionPicker.stop(); //取消移动的maker
    },
    handleOpen() {
      this.dialogVisible = true;
      this.loadmap();
    },
    handleCancel() {
      this.dialogVisible = false;
      this.insureAdress = "";
      this.insureAdressLatAndLon = [];
      this.positionPicker && this.positionPicker.stop(); //取消移动的maker
    },
  },
};
</script>
<style scoped>
.mapContent {
  height: 460px;
}
#all {
  position: relative;
}
#allmap {
  width: 100%;
  height: 100%;
  font-family: "微软雅黑";
}
.posInput {
  position: absolute;
  z-index: 1;
  width: 80%;
  margin-top: 20px;
  margin-left: 10%;
}
::v-deep .el-form-item {
  margin-bottom: 0 !important;
}
.btn_box {
  display: flex;
}
/* 去除高德水印 */
::v-deep .amap-logo {
  display: none;
  opacity: 0 !important;
}
::v-deep .amap-copyright {
  opacity: 0;
}
.title {
  padding-left: 40px;
  font-size: 20px;
}
</style>
