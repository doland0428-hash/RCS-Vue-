
<template>
  <div class="dashboard-view">
    <div class="header-section">
      <div class="title-area">
        <el-tag size="mini" effect="plain" type="danger" class="live-tag">LIVE MARKET</el-tag>
        <h1>贵金属业务核心工作台</h1>
      </div>
      <div class="actions">
        <el-button size="small" icon="el-icon-download">导出快报</el-button>
        <el-button size="small" type="primary" class="boc-btn-red" icon="el-icon-zap">快速下单</el-button>
      </div>
    </div>

    <!-- 资产概览卡片 -->
    <el-row :gutter="20" class="asset-grid">
      <el-col :span="6" v-for="asset in assets" :key="asset.code">
        <div class="asset-card">
          <div class="label">{{ asset.name }}持有 ({{ asset.code }})</div>
          <div class="balance">{{ asset.amount }}</div>
          <div class="footer">
            <span class="value">{{ asset.cnyValue }}</span>
            <span :class="['trend', asset.trend.startsWith('+') ? 'up' : 'down']">
              {{ asset.trend }}
            </span>
          </div>
        </div>
      </el-col>
    </el-row>

    <el-row :gutter="24" class="content-grid">
      <!-- 审批队列 -->
      <el-col :span="16">
        <div class="panel-card">
          <div class="panel-header">
            <span class="title"><i class="el-icon-document-checked"></i> 库存流转审批</span>
            <el-link :underline="false" type="primary" size="mini">流转中心 <i class="el-icon-arrow-right"></i></el-link>
          </div>
          <div class="panel-body">
            <el-table :data="approvalQueue" style="width: 100%" size="small" :header-cell-style="{background: '#f8fafc', color: '#94a3b8', fontSize: '10px', fontWeight: '900', textTransform: 'uppercase'}">
              <el-table-column label="操作" width="100">
                <template slot-scope="scope">
                  <span :class="['op-badge', scope.row.type === 'IN' ? 'in' : 'out']">
                    {{ scope.row.type === 'IN' ? '入库' : '出库' }}
                  </span>
                </template>
              </el-table-column>
              <el-table-column property="metal" label="品种"></el-table-column>
              <el-table-column property="amount" label="数量"></el-table-column>
              <el-table-column property="vault" label="所属仓库"></el-table-column>
              <el-table-column label="操作" align="right">
                <template>
                  <el-button type="text" size="mini" class="text-red">通过</el-button>
                  <el-button type="text" size="mini">拒绝</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>

        <div class="panel-card chart-panel">
          <div class="panel-header">
            <span class="title"><i class="el-icon-data-analysis"></i> 账户资产趋势</span>
          </div>
          <div class="panel-body">
            <div ref="chart" style="width: 100%; height: 300px;"></div>
          </div>
        </div>
      </el-col>

      <!-- 侧边任务 -->
      <el-col :span="8">
        <div class="panel-card todo-panel">
          <div class="panel-header">
            <span class="title"><i class="el-icon-tickets"></i> 待办事项</span>
            <el-badge :value="6" class="item"></el-badge>
          </div>
          <div class="panel-body">
            <div v-for="(task, i) in todos" :key="i" class="todo-item">
              <el-checkbox v-model="task.done"></el-checkbox>
              <div class="info">
                <div class="task-title">{{ task.title }}</div>
                <div class="task-meta">
                  <span :class="['pri', task.pri === 'HIGH' ? 'high' : '']">{{ task.pri }}</span>
                  <span class="due"><i class="el-icon-time"></i> {{ task.time }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="risk-card">
          <div class="risk-label">MARKET RISK STATUS</div>
          <div class="risk-score">LOW</div>
          <div class="risk-meta">系统状态：全局受控 (Protected)</div>
          <el-button type="primary" plain class="risk-btn" size="mini">实时风控报告</el-button>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import * as echarts from 'echarts';

export default {
  data() {
    return {
      assets: [
        { name: '黄金', code: 'XAU', amount: '14,261.67', cnyValue: '≈ ¥2.51亿', trend: '+0.24%' },
        { name: '白银', code: 'XAG', amount: '876,100.00', cnyValue: '≈ ¥1.92亿', trend: '-0.12%' },
        { name: '铂金', code: 'XPT', amount: '8,614.87', cnyValue: '≈ ¥0.61亿', trend: '+1.05%' },
        { name: '钯金', code: 'XPD', amount: '6,088.42', cnyValue: '≈ ¥0.43亿', trend: '+0.88%' },
      ],
      approvalQueue: [
        { type: 'IN', metal: 'XAU (9999)', amount: '250.00 KG', vault: '上海一号', id: 'REQ-01' },
        { type: 'OUT', metal: 'XAG (Grain)', amount: '5,000.00 OZ', vault: '香港分行', id: 'REQ-02' },
        { type: 'IN', metal: 'XPT (Bar)', amount: '120.50 KG', vault: '伦敦中心', id: 'REQ-03' },
      ],
      todos: [
        { title: '二季度黄金实物对账单确认', pri: 'HIGH', time: '17:00', done: false },
        { title: '对手方 JPM 信用额度审核', pri: 'MEDIUM', time: '明日', done: false },
        { title: '下载归档本周清算凭证', pri: 'LOW', time: '2025-06-01', done: true },
      ]
    }
  },
  mounted() {
    this.initChart();
  },
  methods: {
    initChart() {
      const chart = echarts.init(this.$refs.chart);
      chart.setOption({
        tooltip: { trigger: 'axis' },
        grid: { left: '3%', right: '4%', bottom: '3%', containLabel: true },
        xAxis: { type: 'category', boundaryGap: false, data: ['05-22', '05-23', '05-24', '05-25', '05-26', '05-27', '今日'], axisLine: { show: false }, axisTick: { show: false } },
        yAxis: { type: 'value', axisLine: { show: false }, splitLine: { lineStyle: { type: 'dashed', color: '#f1f5f9' } } },
        series: [{
          name: '资产价值',
          type: 'line',
          smooth: true,
          data: [2340, 2390, 2300, 2450, 2480, 2510, 2550],
          itemStyle: { color: '#B6002A' },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: 'rgba(182,0,42,0.2)' },
              { offset: 1, color: 'rgba(182,0,42,0)' }
            ])
          },
          lineStyle: { width: 3 }
        }]
      });
      window.addEventListener('resize', () => chart.resize());
    }
  }
}
</script>

<style lang="scss" scoped>
$boc-red: #B6002A;
$slate-light: #F8FAFC;
$shadow: 0 4px 20px rgba(0,0,0,0.05);

.dashboard-view {
  animation: fadeIn 0.5s ease;
}

.header-section {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 24px;
  
  .title-area {
    h1 { font-size: 24px; font-weight: 800; margin: 8px 0 0 0; color: #1e293b; }
    .live-tag { font-weight: 900; border-radius: 4px; border: 1px solid #fee2e2; }
  }
  
  .actions { display: flex; gap: 12px; }
}

.asset-grid {
  margin-bottom: 24px;
  .asset-card {
    background: white;
    padding: 24px;
    border-radius: 16px;
    box-shadow: $shadow;
    border: 1px solid #eef2f6;
    transition: all 0.3s;
    &:hover { border-color: $boc-red; transform: translateY(-2px); }
    
    .label { font-size: 10px; font-weight: 900; color: #94a3b8; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 8px; }
    .balance { font-size: 24px; font-weight: 900; font-family: 'JetBrains Mono', monospace; color: #1e293b; }
    .footer {
      display: flex;
      justify-content: space-between;
      margin-top: 16px;
      .value { font-size: 10px; font-weight: bold; color: #94a3b8; }
      .trend {
        font-size: 10px; font-weight: 900; padding: 2px 8px; border-radius: 4px;
        &.up { background: #f0fdf4; color: #16a34a; }
        &.down { background: #fef2f2; color: #dc2626; }
      }
    }
  }
}

.panel-card {
  background: white;
  border-radius: 16px;
  box-shadow: $shadow;
  border: 1px solid #eef2f6;
  margin-bottom: 24px;
  overflow: hidden;
  
  .panel-header {
    padding: 16px 20px;
    background: #fcfdfe;
    border-bottom: 1px solid #f1f5f9;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .title { font-weight: 800; font-size: 14px; display: flex; align-items: center; gap: 8px; i { color: $boc-red; } }
  }
  .panel-body { padding: 0; }
}

.chart-panel .panel-body { padding: 20px; }

.op-badge {
  padding: 4px 10px; border-radius: 6px; font-size: 10px; font-weight: 900;
  &.in { background: #fef2f2; color: $boc-red; }
  &.out { background: #f1f5f9; color: #475569; }
}

.todo-item {
  padding: 16px 20px;
  display: flex;
  gap: 16px;
  border-bottom: 1px solid #f8fafc;
  &:last-child { border-bottom: none; }
  &:hover { background: #fcfdfe; }
  
  .info {
    flex: 1;
    .task-title { font-size: 12px; font-weight: bold; margin-bottom: 4px; }
    .task-meta {
      display: flex; gap: 12px; align-items: center;
      .pri { font-size: 9px; font-weight: 900; color: #94a3b8; &.high { color: $boc-red; } }
      .due { font-size: 10px; color: #94a3b8; font-weight: bold; display: flex; align-items: center; gap: 4px; }
    }
  }
}

.risk-card {
  background: $boc-red;
  padding: 24px;
  border-radius: 16px;
  color: white;
  position: relative;
  overflow: hidden;
  
  .risk-label { font-size: 10px; font-weight: 900; opacity: 0.6; letter-spacing: 2px; }
  .risk-score { font-size: 40px; font-weight: 900; margin: 12px 0; }
  .risk-meta { font-size: 10px; font-weight: bold; opacity: 0.8; }
  .risk-btn { margin-top: 20px; background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2); color: white; width: 100%; &:hover { background: rgba(255,255,255,0.2); } }
  
  &::before {
    content: ''; position: absolute; top: -50px; right: -50px; width: 150px; height: 150px;
    background: white; opacity: 0.05; border-radius: 50%;
  }
}

.text-red { color: $boc-red !important; font-weight: bold; }

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
