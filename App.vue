
<template>
  <div class="phoenix-app">
    <!-- 侧边栏 -->
    <aside class="sidebar">
      <div class="brand">
        <div class="logo-circle">
          <div class="diamond"></div>
        </div>
        <div class="brand-text">
          <span class="main">Bank of China</span>
          <span class="sub">中国银行贵金属</span>
        </div>
      </div>
      
      <nav class="menu">
        <div 
          v-for="item in menuItems" 
          :key="item.id"
          :class="['menu-item', { active: activeTab === item.id }]"
          @click="activeTab = item.id"
        >
          <i :class="item.icon"></i>
          <span>{{ item.label }}</span>
        </div>
      </nav>

      <div class="sidebar-footer">
        <p>© 2025 BANK OF CHINA</p>
        <p>V2.0 STABLE</p>
      </div>
    </aside>

    <!-- 主体 -->
    <main class="main-content">
      <header class="top-bar">
        <div class="left">
          <div class="vault-status">
            <i class="el-icon-location-outline"></i>
            <span>BOC MAIN VAULT (CN)</span>
          </div>
          <el-input 
            prefix-icon="el-icon-search" 
            placeholder="快速检索业务流水..." 
            size="small"
            class="search-input"
          ></el-input>
        </div>
        
        <div class="right">
          <div class="system-status">
            <span class="dot pulse"></span>
            GLOBAL LINK ACTIVE
          </div>
          <el-badge is-dot class="notice">
            <i class="el-icon-bell"></i>
          </el-badge>
          <div class="user-profile">
            <div class="user-info">
              <span class="name">James Wilson</span>
              <span class="role">CHIEF STRATEGIST</span>
            </div>
            <el-avatar shape="square" :size="36" src="https://picsum.photos/seed/userBOC/100"></el-avatar>
          </div>
        </div>
      </header>

      <div class="page-container">
        <component :is="activeTabComponent"></component>
      </div>
    </main>

    <!-- 2FA 安全弹窗 -->
    <el-dialog
      title="身份安全校验"
      :visible.sync="show2FA"
      width="400px"
      custom-class="boc-dialog"
      center
    >
      <div class="dialog-content">
        <div class="security-icon">
          <i class="el-icon-lock"></i>
        </div>
        <p class="desc">请通过中国银行企业网银证书进行二次验证</p>
        <el-form label-position="top">
          <el-form-item label="交易密码">
            <el-input type="password" show-password placeholder="请输入交易密码"></el-input>
          </el-form-item>
          <el-form-item label="动态口令 (E-Token)">
            <div class="otp-inputs">
              <el-input v-for="i in 6" :key="i" maxlength="1" size="medium"></el-input>
            </div>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="show2FA = false" size="medium">取消</el-button>
        <el-button type="primary" @click="show2FA = false" size="medium" class="boc-btn-red">授权任务</el-button>
      </span>
    </el-dialog>

    <button class="fab-lock" @click="show2FA = true">
      <i class="el-icon-lock"></i>
    </button>
  </div>
</template>

<script>
import Dashboard from './components/Dashboard.vue';
import Transfers from './components/Transfers.vue';
import Inventory from './components/Inventory.vue';

export default {
  components: { Dashboard, Transfers, Inventory },
  data() {
    return {
      activeTab: 'DASHBOARD',
      show2FA: false,
      menuItems: [
        { id: 'DASHBOARD', label: '工作台首页', icon: 'el-icon-s-home' },
        { id: 'ACCOUNTS', label: '账户概览', icon: 'el-icon-bank-card' },
        { id: 'TRANSFERS', label: '转账清算', icon: 'el-icon-refresh' },
        { id: 'INVENTORY', label: '库存管理', icon: 'el-icon-box' },
        { id: 'PROJECTION', label: '远期预测', icon: 'el-icon-data-line' },
        { id: 'MAILBOX', label: '消息中心', icon: 'el-icon-message' },
      ]
    };
  },
  computed: {
    activeTabComponent() {
      if (this.activeTab === 'DASHBOARD') return 'Dashboard';
      if (this.activeTab === 'TRANSFERS') return 'Transfers';
      if (this.activeTab === 'INVENTORY') return 'Inventory';
      return { render: h => h('div', { class: 'under-construction' }, [
        h('i', { class: 'el-icon-setting' }),
        h('p', '功能开发中...')
      ])};
    }
  }
}
</script>

<style lang="scss">
/* Phoenix SCSS 设计规范 */
$boc-red: #B6002A;
$slate-dark: #1E293B;
$slate-light: #F8FAFC;
$text-main: #334155;
$text-sub: #94A3B8;
$radius-main: 12px;
$shadow-soft: 0 4px 20px rgba(0,0,0,0.05);

.phoenix-app {
  display: flex;
  height: 100vh;
  overflow: hidden;
  color: $text-main;
}

/* 侧边栏样式 */
.sidebar {
  width: 240px;
  background: $slate-dark;
  color: white;
  display: flex;
  flex-direction: column;
  padding: 0;
  
  .brand {
    padding: 24px;
    display: flex;
    align-items: center;
    gap: 12px;
    border-bottom: 1px solid rgba(255,255,255,0.05);
    
    .logo-circle {
      width: 36px;
      height: 36px;
      background: $boc-red;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      .diamond {
        width: 14px;
        height: 14px;
        background: white;
        transform: rotate(45deg);
      }
    }
    
    .brand-text {
      display: flex;
      flex-direction: column;
      .main { font-weight: 900; font-size: 14px; letter-spacing: -0.5px; text-transform: uppercase; }
      .sub { font-size: 10px; color: $text-sub; font-weight: bold; margin-top: 2px; }
    }
  }

  .menu {
    flex: 1;
    padding: 20px 12px;
    
    .menu-item {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 14px 16px;
      border-radius: 10px;
      cursor: pointer;
      transition: all 0.3s;
      color: #94a3b8;
      font-size: 14px;
      font-weight: 500;
      margin-bottom: 4px;
      
      &:hover { background: rgba(255,255,255,0.05); color: white; }
      &.active {
        background: $boc-red;
        color: white;
        box-shadow: 0 10px 15px -3px rgba(182, 0, 42, 0.25);
      }
      
      i { font-size: 18px; }
    }
  }

  .sidebar-footer {
    padding: 20px;
    font-size: 10px;
    color: rgba(255,255,255,0.2);
    font-weight: 900;
    letter-spacing: 2px;
    border-top: 1px solid rgba(255,255,255,0.05);
  }
}

/* 主内容区 */
.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  background: $slate-light;
  overflow-y: auto;
}

.top-bar {
  height: 64px;
  background: white;
  border-bottom: 1px solid #eef2f6;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 32px;
  position: sticky;
  top: 0;
  z-index: 100;

  .left {
    display: flex;
    align-items: center;
    gap: 24px;
    
    .vault-status {
      font-size: 11px;
      font-weight: 900;
      color: $text-sub;
      letter-spacing: 1px;
      display: flex;
      align-items: center;
      gap: 6px;
      i { font-size: 14px; color: $boc-red; }
    }
    
    .search-input { width: 300px; .el-input__inner { border-radius: 10px; background: #f1f5f9; border: none; } }
  }

  .right {
    display: flex;
    align-items: center;
    gap: 24px;
    
    .system-status {
      font-size: 10px;
      font-weight: 900;
      color: $text-sub;
      background: #f1f5f9;
      padding: 6px 12px;
      border-radius: 6px;
      display: flex;
      align-items: center;
      gap: 8px;
      
      .dot { width: 6px; height: 6px; background: #10b981; border-radius: 50%; }
      .pulse { animation: statusPulse 2s infinite; }
    }

    .notice { cursor: pointer; color: $text-sub; font-size: 20px; &:hover { color: $boc-red; } }

    .user-profile {
      display: flex;
      align-items: center;
      gap: 12px;
      padding-left: 20px;
      border-left: 1px solid #eef2f6;
      
      .user-info {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        .name { font-size: 12px; font-weight: bold; }
        .role { font-size: 9px; color: $boc-red; font-weight: 900; letter-spacing: 1px; margin-top: 2px; }
      }
    }
  }
}

.page-container { padding: 32px; max-width: 1400px; margin: 0 auto; width: 100%; box-sizing: border-box; }

/* 2FA Dialog 深度定制 */
.boc-dialog {
  border-radius: 20px;
  .el-dialog__header { background: $boc-red; padding: 30px; .el-dialog__title { color: white; font-weight: 900; text-transform: uppercase; letter-spacing: 2px; } .el-dialog__close { color: white; } }
  .dialog-content {
    text-align: center;
    .security-icon { font-size: 40px; color: $boc-red; margin-bottom: 16px; }
    .desc { font-size: 12px; color: $text-sub; font-weight: bold; margin-bottom: 24px; text-transform: uppercase; }
    .otp-inputs { display: flex; gap: 8px; justify-content: center; .el-input { width: 42px; .el-input__inner { text-align: center; font-weight: bold; } } }
  }
  .boc-btn-red { background: $boc-red; border: none; font-weight: bold; letter-spacing: 1px; &:hover { opacity: 0.9; } }
}

.fab-lock {
  position: fixed;
  bottom: 40px;
  right: 40px;
  width: 56px;
  height: 56px;
  background: $boc-red;
  color: white;
  border-radius: 16px;
  border: 4px solid white;
  box-shadow: 0 10px 30px rgba(182, 0, 42, 0.4);
  cursor: pointer;
  z-index: 1000;
  font-size: 20px;
  transition: all 0.3s;
  &:hover { transform: translateY(-5px) scale(1.05); }
}

@keyframes statusPulse {
  0% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.4); }
  70% { box-shadow: 0 0 0 6px rgba(16, 185, 129, 0); }
  100% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0); }
}

.under-construction {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 60vh;
  color: $text-sub;
  i { font-size: 48px; margin-bottom: 16px; }
  p { font-weight: 900; letter-spacing: 2px; text-transform: uppercase; }
}
</style>
