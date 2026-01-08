
<template>
  <div class="inventory-view">
    <div class="header-section">
      <div>
        <h1>库存与资产流转</h1>
        <p class="subtitle">管理全球金库实物库存的入库、出库及调拨指令</p>
      </div>
      <div class="actions">
        <el-button size="small">仓储中心管理</el-button>
        <el-button size="small" type="primary" class="boc-btn-red" icon="el-icon-plus">创建出入库单</el-button>
      </div>
    </div>

    <!-- 顶部标签切换 -->
    <el-tabs v-model="activeTab" class="boc-tabs-classic">
      <el-tab-pane label="流转审批明细" name="FLOW"></el-tab-pane>
      <el-tab-pane label="全球实物库存" name="STOCK"></el-tab-pane>
    </el-tabs>

    <div v-if="activeTab === 'FLOW'" class="tab-content animate-fade">
      <!-- 指标统计栏 -->
      <el-row :gutter="20" class="stat-grid">
        <el-col :span="6" v-for="stat in stats" :key="stat.label">
          <div class="stat-card">
            <div :class="['icon-box', stat.type]">
              <i :class="stat.icon"></i>
            </div>
            <div class="info">
              <div class="label">{{ stat.label }}</div>
              <div class="value">{{ stat.value }}</div>
            </div>
          </div>
        </el-col>
      </el-row>

      <!-- 数据列表 -->
      <div class="table-card">
        <div class="card-header">
          <span class="title"><i class="el-icon-collection"></i> 运营指令记录 (Operational Records)</span>
          <div class="search-area">
            <el-input size="mini" prefix-icon="el-icon-search" placeholder="搜索单据编号..."></el-input>
          </div>
        </div>
        <el-table :data="tableData" size="small" style="width: 100%" class="phoenix-table-tight">
          <el-table-column label="指令类型/编号" width="220">
            <template slot-scope="scope">
              <div class="type-cell">
                <i :class="scope.row.type === 'IN' ? 'el-icon-bottom-left text-red' : 'el-icon-top-right text-slate'"></i>
                <div class="meta">
                  <span class="main">{{ scope.row.type === 'IN' ? '实物入库' : '实物出库' }}</span>
                  <span class="sub">{{ scope.row.id }}</span>
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column property="metal" label="贵金属规格"></el-table-column>
          <el-table-column property="amount" label="数量 (OZ/KG)" align="right"></el-table-column>
          <el-table-column property="vault" label="物理仓库"></el-table-column>
          <el-table-column label="审批状态">
            <template slot-scope="scope">
              <el-tag :type="scope.row.statusType" size="mini" effect="dark">{{ scope.row.statusLabel }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="right" width="80">
            <template>
              <el-button type="text" icon="el-icon-more"></el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>

    <div v-else class="empty-placeholder">
      <i class="el-icon-box"></i>
      <h3>Global Asset Visualizer</h3>
      <p>正在调取全球金库实时监控与盘点数据...</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeTab: 'FLOW',
      stats: [
        { label: '入库审批中', value: '12', icon: 'el-icon-bottom-left', type: 'danger' },
        { label: '出库审批中', value: '08', icon: 'el-icon-top-right', type: 'info' },
        { label: '本月完成笔数', value: '1,245', icon: 'el-icon-circle-check', type: 'success' },
        { label: '待处理异常', value: '02', icon: 'el-icon-warning-outline', type: 'warning' },
      ],
      tableData: [
        { type: 'IN', id: 'BOC-REQ-8821', metal: 'XAU (9999 Gold)', amount: '10.000 KG', vault: '上海一号库', statusLabel: '待审核', statusType: 'danger' },
        { type: 'OUT', id: 'BOC-REQ-8790', metal: 'XAG (Grain Silver)', amount: '500.000 OZ', vault: '香港分行库', statusLabel: '已通过', statusType: 'success' },
        { type: 'IN', id: 'BOC-REQ-8755', metal: 'XPT (Platinum Bar)', amount: '5.250 KG', vault: '伦敦中心库', statusLabel: '已驳回', statusType: 'info' },
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
$boc-red: #B6002A;

.inventory-view { animation: fadeIn 0.4s ease; }

.header-section {
  display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 24px;
  h1 { font-size: 24px; font-weight: 800; margin: 0; color: #1e293b; }
  .subtitle { color: #94a3b8; font-size: 13px; font-weight: 500; margin: 4px 0 0 0; }
}

.boc-tabs-classic {
  margin-bottom: 32px;
  /deep/ .el-tabs__item { font-weight: 900; font-size: 13px; text-transform: uppercase; letter-spacing: 1px; }
  /deep/ .el-tabs__active-bar { background-color: $boc-red; }
  /deep/ .el-tabs__item.is-active { color: $boc-red; }
}

.stat-grid {
  margin-bottom: 24px;
  .stat-card {
    background: white; padding: 20px; border-radius: 16px; border: 1px solid #eef2f6; display: flex; align-items: center; gap: 16px;
    .icon-box {
      width: 48px; height: 48px; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 20px;
      &.danger { background: #fef2f2; color: $boc-red; }
      &.info { background: #f1f5f9; color: #475569; }
      &.success { background: #f0fdf4; color: #16a34a; }
      &.warning { background: #fffbeb; color: #d97706; }
    }
    .info {
      .label { font-size: 10px; font-weight: 900; color: #94a3b8; text-transform: uppercase; letter-spacing: 1px; }
      .value { font-size: 24px; font-weight: 900; font-family: 'JetBrains Mono', monospace; color: #1e293b; }
    }
  }
}

.table-card {
  background: white; border-radius: 16px; border: 1px solid #eef2f6; overflow: hidden;
  .card-header {
    padding: 16px 24px; border-bottom: 1px solid #f1f5f9; display: flex; justify-content: space-between; align-items: center;
    background: #fcfdfe;
    .title { font-weight: 800; font-size: 13px; color: #475569; text-transform: uppercase; display: flex; align-items: center; gap: 8px; i { color: $boc-red; } }
    .search-area { width: 200px; }
  }
}

.type-cell {
  display: flex; align-items: center; gap: 12px;
  i { font-size: 16px; padding: 6px; border-radius: 8px; background: #f8fafc; }
  .text-red { color: $boc-red; }
  .text-slate { color: #64748b; }
  .meta {
    display: flex; flex-direction: column;
    .main { font-weight: 800; color: #1e293b; }
    .sub { font-size: 10px; color: #94a3b8; font-family: monospace; }
  }
}

.empty-placeholder {
  display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 100px 0; color: #94a3b8;
  i { font-size: 64px; margin-bottom: 24px; opacity: 0.2; }
  h3 { font-weight: 900; letter-spacing: 2px; color: #1e293b; margin: 0; }
  p { font-size: 12px; font-weight: bold; margin-top: 8px; opacity: 0.6; }
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
