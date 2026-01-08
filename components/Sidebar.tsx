
import React from 'react';
import { 
  LayoutDashboard, 
  Wallet, 
  ArrowLeftRight, 
  Box, 
  TrendingUp, 
  FileText, 
  Mail,
  ChevronRight
} from 'lucide-react';
import { TabType } from '../types';

interface SidebarProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { id: TabType.DASHBOARD, label: '工作台首页', icon: LayoutDashboard },
    { id: TabType.ACCOUNTS, label: '账户概览', icon: Wallet },
    { id: TabType.TRANSFERS, label: '转账清算', icon: ArrowLeftRight },
    { id: TabType.INVENTORY, label: '库存管理', icon: Box },
    { id: TabType.PROJECTION, label: '远期预测', icon: TrendingUp },
    { id: TabType.STATEMENTS, label: '账单报告', icon: FileText },
    { id: TabType.MAILBOX, label: '消息中心', icon: Mail },
  ];

  return (
    <div className="w-64 bg-slate-900 text-white h-screen fixed left-0 top-0 flex flex-col shadow-xl z-50">
      <div className="p-6 flex items-center gap-3 border-b border-slate-800">
        {/* 中国银行 Logo 模拟 */}
        <div className="w-10 h-10 bg-[#B6002A] rounded-full flex items-center justify-center relative shadow-lg">
          <div className="w-4 h-4 bg-white rounded-sm rotate-45"></div>
          <div className="absolute w-6 h-0.5 bg-white"></div>
          <div className="absolute h-6 w-0.5 bg-white"></div>
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-black tracking-tighter uppercase leading-none">Bank of China</span>
          <span className="text-[10px] font-bold text-slate-400 mt-1">中国银行贵金属</span>
        </div>
      </div>
      
      <nav className="flex-1 mt-6 overflow-y-auto px-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 group ${
                isActive 
                  ? 'bg-[#B6002A] text-white font-bold shadow-lg shadow-[#B6002A]/20' 
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon size={18} />
                <span className="text-sm tracking-wide">{item.label}</span>
              </div>
              {isActive && <ChevronRight size={14} />}
            </button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-slate-800 text-[10px] text-slate-500 font-bold uppercase tracking-widest">
        <p>© 2025 BANK OF CHINA</p>
        <p className="mt-1 opacity-50 text-[8px]">Precious Metals Portal v3.0</p>
      </div>
    </div>
  );
};

export default Sidebar;
