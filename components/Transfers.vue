
<template>
  <div class="transfers-view">
    <div class="header-section">
      <div>
        <h1>转账清算指令 (Transfers)</h1>
        <p class="subtitle">实时管理全球金属流转与对手方结算指令</p>
      </div>
      <div class="actions">
        <el-button size="small" icon="el-icon-upload2">批量导入</el-button>
        <el-button size="small" type="primary" class="boc-btn-red" icon="el-icon-plus">新建转账</el-button>
      </div>
    </div>

    <!-- 状态磁贴 -->
    <div class="status-tabs">
      <div v-for="s in statusGroups" :key="s.label" class="status-card">
        <div class="s-label">{{ s.label }}</div>
        <div :class="['s-value', s.type]">{{ s.count }}</div>
      </div>
    </div>

    <div class="table-container">
      <div class="toolbar">
        <el-tabs v-model="activeFilter" class="boc-tabs">
          <el-tab-pane label="全部指令" name="all"></el-tab-pane>
          <el-tab-pane label="待我审批" name="pending"></el-tab-pane>
          <el-tab-pane label="处理中" name="processing"></el-tab-pane>
          <el-tab-pane label="异常挂起" name="error"></el-tab-pane>
        </el-tabs>
        <div class="search-box">
          <el-input size="small" prefix-icon="el-icon-search" placeholder="检索对手方或参考号"></el-input>
        </div>
      </div>

      <el-table :data="tableData" style="width: 100%" size="small" class="phoenix-table">
        <el-table-column label="金属品种" width="120">
          <template slot-scope="scope">
            <span class="metal-cell">{{ scope.row.metal }}</span>
          </template>
        </el-table-column>
        <el-table-column property="date" label="价值日" width="120"></el-table-column>
        <el-table-column property="counterparty" label="交易对手方"></el-table-column>
        <el-table-column label="方向" width="100">
          <template slot-scope="scope">
            <span :class="['dir-badge', scope.row.dir === 'PAY' ? 'pay' : 'rec']">
              {{ scope.row.dir === 'PAY' ? '支出' : '收入' }}
            </span>
          </template>
        </el-table-column>
        <el-table-column label="数量 (OZ)" width="150" align="right">
          <template slot-scope="scope">
            <span class="amount-cell">{{ scope.row.amount }}</span>
          </template>
        </el-table-column>
        <el-table-column label="结算状态">
          <template slot-scope="scope">
            <div class="status-cell">
              <span :class="['dot', scope.row.status]"></span>
              {{ scope.row.statusLabel }}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="100" align="right">
          <template>
            <el-dropdown trigger="click">
              <el-button type="text" icon="el-icon-more"></el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>查看详情</el-dropdown-item>
                <el-dropdown-item>打印凭证</el-dropdown-item>
                <el-dropdown-item class="text-red">取消指令</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>
      </el-table>

      <div class="pagination">
        <el-pagination
          background
          layout="prev, pager, next, total"
          :total="51"
          :page-size="10"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeFilter: 'all',
      statusGroups: [
        { label: '待授权', count: 30, type: 'warn' },
        { label: '声称转账', count: 1, type: 'info' },
        { label: '未匹配', count: 7, type: 'danger' },
        { label: '已确认', count: 3, type: 'success' },
      ],
      tableData: [
        { metal: 'XAU (黄金)', date: '2025-05-28', counterparty: 'J.P. Morgan Chase', dir: 'PAY', amount: '10,000.25', status: 'processing', statusLabel: '处理中' },
        { metal: 'XPT (铂金)', date: '2025-05-29', counterparty: 'Wells Fargo', dir: 'REC', amount: '9,999.00', status: 'pending', statusLabel: '待授权' },
        { metal: 'XAG (白银)', date: '2025-05-30', counterparty: 'Citigroup', dir: 'PAY', amount: '500,000.00', status: 'error', statusLabel: '未匹配' },
        { metal: 'XAU (黄金)', date: '2025-05-28', counterparty: 'ICBC (Asia) Ltd', dir: 'REC', amount: '1,500.00', status: 'success', statusLabel: '已确认' },
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
$boc-red: #B6002A;

.transfers-view { animation: fadeIn 0.4s ease; }

.header-section {
  display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 32px;
  h1 { font-size: 24px; font-weight: 800; margin: 0; }
  .subtitle { color: #94a3b8; font-size: 13px; font-weight: 500; margin: 4px 0 0 0; }
  .actions { display: flex; gap: 12px; }
}

.status-tabs {
  display: flex; gap: 16px; margin-bottom: 24px;
  .status-card {
    flex: 1; background: white; padding: 20px; border-radius: 12px; border: 1px solid #eef2f6; box-shadow: 0 2px 10px rgba(0,0,0,0.02);
    .s-label { font-size: 11px; font-weight: 900; color: #94a3b8; text-transform: uppercase; margin-bottom: 8px; }
    .s-value {
      font-size: 24px; font-weight: 900;
      &.warn { color: #f59e0b; }
      &.danger { color: #ef4444; }
      &.success { color: #10b981; }
      &.info { color: #3b82f6; }
    }
  }
}

.table-container {
  background: white; border-radius: 16px; border: 1px solid #eef2f6; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.04);
  .toolbar {
    padding: 0 20px; border-bottom: 1px solid #f1f5f9; display: flex; justify-content: space-between; align-items: center;
    .boc-tabs /deep/ .el-tabs__header { margin-bottom: 0; border-bottom: none; .el-tabs__nav-wrap::after { display: none; } }
    .search-box { width: 240px; }
  }
  .pagination { padding: 16px 20px; display: flex; justify-content: center; }
}

.metal-cell { font-weight: 800; color: #1e293b; }
.amount-cell { font-family: 'JetBrains Mono', monospace; font-weight: 900; color: #1e293b; }

.dir-badge {
  font-size: 10px; font-weight: 900; padding: 2px 8px; border-radius: 4px;
  &.pay { background: #fef2f2; color: $boc-red; }
  &.rec { background: #f0fdf4; color: #16a34a; }
}

.status-cell {
  display: flex; align-items: center; gap: 8px; font-size: 12px; font-weight: bold;
  .dot {
    width: 6px; height: 6px; border-radius: 50%;
    &.success { background: #10b981; box-shadow: 0 0 8px rgba(16, 185, 129, 0.4); }
    &.processing { background: #3b82f6; }
    &.pending { background: #f59e0b; }
    &.error { background: #ef4444; }
  }
}

.text-red { color: $boc-red !important; }

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
