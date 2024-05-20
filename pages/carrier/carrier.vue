<template name="承运人管理页面">
  <view>
    <!-- 承运人管理 顶部 导航栏 -->
    <u-navbar title="承运人管理" placeholder="true">
      <!-- 承运人管理 搜索框 -->
    </u-navbar>
    <view
      ref="searchContainer"
      class="searchContainer"
      style="position: relative"
    >
      <u-search
        placeholder="请输入手机号"
        actionText="筛选"
        @custom="showFilterPopup"
      ></u-search>
    </view>

    <!-- 滚动视图 包含下拉刷新功能 -->
    <scroll-view
      scroll-y
      :scroll-top="scrollTop"
      @scrolltolower="loadMore"
      :refresher-enabled="true"
      :refresher-threshold="50"
      :refresher-default-style="'black'"
      :refresher-background="'#f8f8f8'"
      :refresher-triggered="refresherTriggered"
      style="height: calc(100vh - 100px)"
    >
      <!-- 适当调整100px以匹配搜索框和导航栏的总高度 -->
      <!-- 承运人管理 卡片 -->
      <view v-for="(item, index) in dataList" :key="item.id">
        <u-card :show-head="false" :key="item.id">
          <view class="card-list" slot="body">
            <view class="info-box">
              <view class="info">
                <text class="label">{{ item.driverName }}:</text>
                <text class="value">{{ item.phone }}</text>
              </view>
              <view class="info">
                <text class="label">是否为驾驶员：</text>
                <text class="value" v-if="item.isDriver == 1">是</text>
                <text class="value" v-if="item.isDriver == 0">否</text>
              </view>
              <view class="info">
                <text class="label">实名认证：</text>
                <text
                  v-if="item.auditStatus == 0"
                  mode="light"
                  style="color: dimgray"
                  class="value status"
                  >未认证</text
                >
                <text
                  v-if="item.auditStatus == 1"
                  mode="light"
                  style="color: chocolate"
                  class="value status"
                  >等待审核</text
                >
                <text
                  v-if="item.auditStatus == 2"
                  mode="light"
                  style="color: forestgreen"
                  class="value status"
                  >认证成功</text
                >
                <text
                  v-if="item.auditStatus == 3"
                  mode="light"
                  style="color: red"
                  class="value status"
                  >认证失败</text
                >
              </view>
              <view class="info">
                <text class="label">司机认证：</text>
                <text
                  v-if="item.attestationStatus == 1"
                  style="color: chocolate"
                  class="value status"
                  >正在审核</text
                >
                <text
                  v-if="item.attestationStatus == 2"
                  style="color: forestgreen"
                  class="value status"
                  >认证成功</text
                >
                <text
                  v-if="item.attestationStatus == 3"
                  style="color: red"
                  class="value status"
                  >认证失败</text
                >
              </view>
            </view>
            <view class="buttons-box">
              <u-button
                type="primary"
                @click="goEdit(item, 'examine')"
                size="medium"
                >审核</u-button
              >
              <u-button
                type="primary"
                @click="goEdit(item, 'edit')"
                size="medium"
                >编辑</u-button
              >
            </view>
          </view>
        </u-card>
      </view>
      <view v-if="loadingMore" class="loading">加载中...</view>
      <view v-if="!hasMoreData" class="loading">没有更多数据</view>
    </scroll-view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      dataList: [], // 列表数据
      pageSize: 10, // 每页显示条数
      pageNo: 1, // 当前页码
      loadingMore: false, // 加载更多标识
      hasMoreData: true, // 是否还有更多数据
      scrollTop: 0, // 滚动高度
      refresherTriggered: false, // 下拉刷新标识
      isPopup: false, // 弹出框标识
      isDriver: false, // 是否驾驶员选择框显示标识
      isDriverList: [
        { label: "全部", value: "" },
        { label: "是", value: "1" },
        { label: "否", value: "2" },
      ],
      selectedDriverLabel: "全部", // 默认显示的驾驶员标签
    };
  },
  onLoad() {
    this.initList();
  },
  methods: {
    showDriverPicker() {
      this.isDriver = true;
    },
    closeDriverPicker() {
      this.isDriver = false;
    },
    getDriver(e) {
      this.selectedDriverLabel = e[0].label;
      this.isDriver = false;
      console.log(e, "e");
    },
    // 初始化列表
    initList() {
      this.pageNo = 1;
      this.getData(true);
    },
    // 获取数据
    getData(isRefresh = false) {
      this.$http
        .get("ntocc/tmsDriver/queryList", {
          params: {
            pageSize: this.pageSize,
            pageNo: this.pageNo,
            isDriverQueryParam: 0,
            typeInfo: 3,
          },
        })
        .then((res) => {
          if (res.data.success) {
            const records = res.data.result.records;
            if (isRefresh) {
              this.dataList = records;
            } else {
              this.dataList = [...this.dataList, ...records];
            }

            // 检查是否还有更多数据
            if (records.length < this.pageSize) {
              this.hasMoreData = false;
            } else {
              this.hasMoreData = true;
            }
          } else {
            uni.showToast({
              title: res.data.message,
              icon: "none",
            });
          }
        })
        .finally(() => {
          this.loadingMore = false;
          this.refresherTriggered = false;
        });
    },
    // 加载更多
    loadMore() {
      if (this.loadingMore || !this.hasMoreData) return;
      this.loadingMore = true;
      this.pageNo += 1;
      this.getData();
    },
    // 下拉刷新
    refresh() {
      this.refresherTriggered = true;
      this.hasMoreData = true;
      this.initList();
    },
    goEdit(item, action) {
      // 编辑或审核的逻辑
      console.log(`Action: ${action}`, item);
    },
    // 显示筛选弹出层
    showFilterPopup() {
      this.isPopup = true;
    },
    // 关闭弹出层
    closePopup() {
      this.isPopup = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.info {
  margin: 5px 0;
}

.label {
  font-weight: bold;
}

.success {
  color: green;
}

.buttons-box {
  margin-top: 10rpx;
  display: flex;
  justify-content: space-around;
}

.button-separator {
  width: 10px;
  /* 调整这个值来设置按钮之间的间隔 */
}

.loading {
  text-align: center;
  padding: 10px;
}

.filter-popup {
  background-color: white;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  z-index: 1000;
}

.u-slot-title {
  display: flex;
  align-items: center;
}

.u-cell-text {
  margin-right: 10px;
}
</style>
