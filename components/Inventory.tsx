
import React, { useState } from 'react';
import { 
  ArrowUpRight, ArrowDownLeft, Search, Filter, CheckCircle2, 
  XCircle, MoreHorizontal, Plus, Package, Database, ShieldCheck
} from 'lucide-react';

const Inventory: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<'FLOW' | 'STOCK'>('FLOW');

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">库存与资产流转</h1>
          <p className="text-slate-500 text-sm font-medium">管理全球金库实物库存的入库、出库及调拨指令。</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 border border-slate-200 text-slate-600 font-bold rounded-xl hover:bg-slate-50 flex items-center gap-2 text-xs transition-all">
            仓储中心管理
          </button>
          <button className="px-5 py-2 bg-[#B6002A] text-white font-black rounded-xl hover:bg-[#960022] flex items-center gap-2 text-xs shadow-lg shadow-[#B6002A]/20 transition-all uppercase tracking-widest">
            <Plus size={16} /> 创建出入库单
          </button>
        </div>
      </header>

      {/* 顶部标签切换 */}
      <div className="flex gap-10 border-b border-slate-200">
        <button 
          onClick={() => setActiveSubTab('FLOW')}
          className={`pb-3 text-xs font-black uppercase tracking-widest transition-all relative flex items-center gap-2 ${
            activeSubTab === 'FLOW' ? 'text-[#B6002A]' : 'text-slate-400 hover:text-slate-600'
          }`}
        >
          <Database size={14} /> 流转审批明细
          {activeSubTab === 'FLOW' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#B6002A]"></div>}
        </button>
        <button 
          onClick={() => setActiveSubTab('STOCK')}
          className={`pb-3 text-xs font-black uppercase tracking-widest transition-all relative flex items-center gap-2 ${
            activeSubTab === 'STOCK' ? 'text-[#B6002A]' : 'text-slate-400 hover:text-slate-600'
          }`}
        >
          <Package size={14} /> 全球实物库存
          {activeSubTab === 'STOCK' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#B6002A]"></div>}
        </button>
      </div>

      {activeSubTab === 'FLOW' ? (
        <div className="space-y-6">
          {/* 指标统计栏 */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              { label: '入库审批中', value: '12', icon: ArrowDownLeft, color: 'text-red-600', bg: 'bg-red-50' },
              { label: '出库审批中', value: '08', icon: ArrowUpRight, color: 'text-slate-600', bg: 'bg-slate-100' },
              { label: '本月完成笔数', value: '1,245', icon: CheckCircle2, color: 'text-green-600', bg: 'bg-green-50' },
              { label: '待处理异常', value: '02', icon: XCircle, color: 'text-slate-400', bg: 'bg-slate-50' },
            ].map((stat, i) => (
              <div key={i} className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl ${stat.bg} ${stat.color} flex items-center justify-center shadow-inner`}>
                  <stat.icon size={24} />
                </div>
                <div>
                  <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">{stat.label}</div>
                  <div className={`text-2xl font-black font-mono ${stat.color}`}>{stat.value}</div>
                </div>
              </div>
            ))}
          </div>

          {/* 数据列表 */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-4 border-b border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4 bg-slate-50/30">
              <div className="flex items-center gap-2">
                <ShieldCheck size={18} className="text-[#B6002A]" />
                <span className="text-xs font-black uppercase tracking-widest text-slate-800">Operational Records</span>
              </div>
              <div className="flex gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                  <input type="text" placeholder="搜索单据编号..." className="pl-9 pr-4 py-2 text-[10px] font-bold border border-slate-200 rounded-xl focus:ring-4 focus:ring-[#B6002A]/10 outline-none transition-all w-52 bg-white" />
                </div>
                <button className="px-3 py-2 border border-slate-200 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 hover:bg-white bg-slate-50">
                  <Filter size={14} /> 筛选条件
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-white text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] border-b border-slate-100">
                  <tr>
                    <th className="px-6 py-5">指令类型/编号</th>
                    <th className="px-6 py-5">贵金属规格</th>
                    <th className="px-6 py-5 text-right">数量 (OZ/KG)</th>
                    <th className="px-6 py-5">物理仓库</th>
                    <th className="px-6 py-5">审批状态</th>
                    <th className="px-6 py-5 text-right">操作</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-[11px] font-bold">
                  {[
                    { type: 'INBOUND', metal: 'XAU (9999 Gold)', amount: '10.000 KG', vault: '上海一号库', id: 'BOC-REQ-8821', status: 'PENDING', step: '一级审批' },
                    { type: 'OUTBOUND', metal: 'XAG (Grain Silver)', amount: '500.000 OZ', vault: '香港分行库', id: 'BOC-REQ-8790', status: 'APPROVED', step: '已归档' },
                    { type: 'INBOUND', metal: 'XPT (Platinum Bar)', amount: '5.250 KG', vault: '伦敦中心库', id: 'BOC-REQ-8755', status: 'REJECTED', step: '已驳回' },
                  ].map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/80 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className={`p-1.5 rounded-lg ${row.type === 'INBOUND' ? 'bg-red-50 text-[#B6002A]' : 'bg-slate-100 text-slate-500'}`}>
                            {row.type === 'INBOUND' ? <ArrowDownLeft size={16} /> : <ArrowUpRight size={16} />}
                          </div>
                          <div className="flex flex-col">
                            <span className="text-slate-800 font-black">{row.type === 'INBOUND' ? '实物入库' : '实物出库'}</span>
                            <span className="text-[9px] text-slate-400 font-mono mt-0.5">{row.id}</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-slate-600">{row.metal}</td>
                      <td className="px-6 py-4 text-right font-black font-mono text-slate-800">{row.amount}</td>
                      <td className="px-6 py-4 text-slate-500">{row.vault}</td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col gap-1">
                          <span className={`w-fit px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest ${
                            row.status === 'PENDING' ? 'bg-red-50 text-[#B6002A]' : 
                            row.status === 'APPROVED' ? 'bg-green-50 text-green-600' : 'bg-slate-100 text-slate-400'
                          }`}>
                            {row.status === 'PENDING' ? '待审核' : row.status === 'APPROVED' ? '已通过' : '已驳回'}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button className="text-slate-400 hover:text-slate-800"><MoreHorizontal size={18} /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-24 bg-white rounded-2xl border border-dashed border-slate-200">
          <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-6 shadow-inner">
            <Package size={36} className="text-slate-200" />
          </div>
          <h3 className="text-slate-800 font-black uppercase tracking-widest">Global Asset Visualizer</h3>
          <p className="text-xs text-slate-400 mt-2 font-bold uppercase tracking-tight opacity-70">正在调取全球金库实时监控与盘点数据...</p>
        </div>
      )}
    </div>
  );
};

export default Inventory;
