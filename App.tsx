
import React, { useState } from 'react';
import { TabType } from './types';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Transfers from './components/Transfers';
import Inventory from './components/Inventory';
import { 
  Bell, 
  Search, 
  ChevronDown,
  Lock,
  RefreshCw,
  Globe
} from 'lucide-react';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>(TabType.DASHBOARD);
  const [is2FAModalOpen, setIs2FAModalOpen] = useState(false);

  const renderContent = () => {
    switch (activeTab) {
      case TabType.DASHBOARD:
        return <Dashboard />;
      case TabType.TRANSFERS:
        return <Transfers />;
      case TabType.INVENTORY:
        return <Inventory />;
      case TabType.ACCOUNTS:
      case TabType.PROJECTION:
      case TabType.STATEMENTS:
      case TabType.MAILBOX:
        return (
          <div className="flex flex-col items-center justify-center h-[60vh] text-slate-400 space-y-4">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center">
              <Lock size={32} />
            </div>
            <div className="text-center">
              <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest">{activeTab} MODULE UNDER CONSTRUCTION</h3>
              <p className="text-[10px] font-bold text-slate-400 mt-2 uppercase tracking-tight">此功能在当前原型阶段暂未开放，请查看仪表盘或库存管理页面。</p>
            </div>
          </div>
        );
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex selection:bg-[#B6002A]/10 selection:text-[#B6002A]">
      {/* 侧边导航 */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* 主内容区 */}
      <main className="flex-1 ml-64 min-h-screen flex flex-col">
        {/* 顶部工具栏 */}
        <header className="h-16 bg-white border-b border-slate-100 flex items-center justify-between px-8 sticky top-0 z-40">
          <div className="flex items-center gap-6 w-1/2">
            <div className="flex items-center gap-2 text-slate-400 hover:text-[#B6002A] cursor-pointer transition-colors group">
              <Globe size={18} className="group-hover:rotate-12 transition-transform" />
              <span className="text-[10px] font-black tracking-[0.2em] uppercase">CN / BOC Main Vault</span>
              <ChevronDown size={14} />
            </div>
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
              <input 
                type="text" 
                placeholder="快速检索业务流水或指令..." 
                className="w-full pl-11 pr-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-[10px] font-bold focus:outline-none focus:ring-4 focus:ring-[#B6002A]/5 focus:border-[#B6002A]/20 transition-all uppercase tracking-tight"
              />
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 text-[9px] font-black text-slate-500 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
              <RefreshCw size={10} className="text-[#B6002A] animate-spin-slow" />
              <span className="uppercase tracking-widest">Global Link Active</span>
            </div>
            
            <button className="relative p-2 text-slate-400 hover:text-slate-800 transition-colors">
              <Bell size={18} />
              <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-[#B6002A] rounded-full ring-2 ring-white"></span>
            </button>

            <div className="h-6 w-px bg-slate-100"></div>

            <button className="flex items-center gap-3 group">
              <div className="flex flex-col items-end">
                <span className="text-xs font-black text-slate-800 leading-none">James Wilson</span>
                <span className="text-[8px] text-[#B6002A] font-black tracking-[0.2em] uppercase mt-1">Chief Strategist</span>
              </div>
              <div className="w-9 h-9 rounded-xl bg-slate-900 border-2 border-white shadow-lg overflow-hidden group-hover:border-[#B6002A]/20 transition-all">
                <img src="https://picsum.photos/seed/userBOC/100" alt="Avatar" className="w-full h-full object-cover" />
              </div>
            </button>
          </div>
        </header>

        {/* 核心内容 */}
        <div className="p-8 max-w-[1400px] mx-auto w-full flex-1">
          {renderContent()}
        </div>

        {/* 底部状态栏 */}
        <footer className="px-8 py-5 border-t border-slate-100 flex justify-between items-center text-[9px] text-slate-400 font-black uppercase tracking-[0.3em] bg-white">
          <div className="flex gap-8">
            <a href="#" className="hover:text-[#B6002A]">Compliance</a>
            <a href="#" className="hover:text-[#B6002A]">Security Center</a>
            <a href="#" className="hover:text-[#B6002A]">System Health</a>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-green-500">Global Infrastructure Online</span>
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-sm"></div>
          </div>
        </footer>
      </main>

      {/* 2FA 验证弹窗适配 */}
      {is2FAModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/40 backdrop-blur-md p-4 animate-in fade-in duration-300">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-300 border border-slate-100">
            <div className="bg-[#B6002A] p-10 flex flex-col items-center text-white relative">
              <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none overflow-hidden">
                 <div className="w-96 h-96 border-[40px] border-white rounded-full -mt-24 -ml-24"></div>
              </div>
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-6 backdrop-blur-md shadow-inner">
                <Lock size={32} />
              </div>
              <h2 className="text-2xl font-black uppercase tracking-widest text-center">Identity Verification</h2>
              <p className="text-white/70 text-[10px] font-bold mt-3 text-center uppercase tracking-[0.2em]">请通过中国银行企业网银证书或移动 CA 进行二次验证</p>
            </div>
            <div className="p-10 space-y-8 bg-white">
              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Transaction Password</label>
                <input 
                  type="password" 
                  className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-[#B6002A]/5 focus:border-[#B6002A]/30 transition-all font-mono placeholder:text-slate-300"
                  placeholder="请输入您的 8-16 位交易密码"
                />
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">E-Token / SMS OTP</label>
                <div className="grid grid-cols-6 gap-2">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <input 
                      key={i} 
                      type="text" 
                      maxLength={1} 
                      className="w-full h-14 text-center text-xl font-black bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-[#B6002A]/5 focus:border-[#B6002A]/30 transition-all"
                    />
                  ))}
                </div>
              </div>
              <div className="flex gap-4 pt-6">
                <button 
                  onClick={() => setIs2FAModalOpen(false)}
                  className="flex-1 py-4 text-slate-400 font-black text-[10px] uppercase tracking-[0.2em] hover:text-slate-800 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => setIs2FAModalOpen(false)}
                  className="flex-[2] py-4 bg-[#B6002A] text-white rounded-2xl font-black text-[10px] uppercase tracking-[0.3em] hover:bg-[#960022] shadow-xl shadow-[#B6002A]/30 transition-all active:scale-95"
                >
                  Authorize Task
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2FA 浮动按钮 */}
      <button 
        onClick={() => setIs2FAModalOpen(true)}
        className="fixed bottom-10 right-10 w-16 h-16 bg-[#B6002A] text-white rounded-2xl flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all z-50 group border-4 border-white"
      >
        <Lock size={22} className="group-hover:rotate-12 transition-transform" />
      </button>

      <style>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 12s linear infinite;
        }
        body {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
          letter-spacing: -0.01em;
        }
      `}</style>
    </div>
  );
};

export default App;
