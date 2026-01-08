
import React from 'react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';
import { 
  TrendingUp, Download, Clock, ArrowUpRight, ArrowDownLeft, 
  ListTodo, CheckCircle2, ChevronRight, Zap
} from 'lucide-react';

const chartData = [
  { name: '05-22', value: 2340 },
  { name: '05-23', value: 2390 },
  { name: '05-24', value: 2300 },
  { name: '05-25', value: 2450 },
  { name: '05-26', value: 2480 },
  { name: '05-27', value: 2510 },
  { name: '今日', value: 2550 },
];

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6 animate-in fade-in duration-700 pb-12">
      {/* 顶部标题栏 */}
      <header className="flex justify-between items-end">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="bg-red-50 text-[#B6002A] text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-widest border border-red-100">Live Services</span>
            <h1 className="text-2xl font-bold text-slate-800">中国银行贵金属工作台</h1>
          </div>
          <p className="text-slate-500 text-sm font-medium">您好，当前有 <span className="text-[#B6002A] font-bold">5</span> 项待审批任务正在队列中。</p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 border border-slate-200 rounded-xl bg-white hover:bg-gray-50 flex items-center gap-2 text-xs shadow-sm transition-all font-bold text-slate-600">
            <Download size={14} /> 导出运营快报
          </button>
          <button className="px-5 py-2 bg-[#B6002A] text-white rounded-xl hover:bg-[#960022] flex items-center gap-2 text-xs shadow-lg shadow-[#B6002A]/20 transition-all font-bold uppercase tracking-widest">
            <Zap size={14} fill="currentColor" /> 快速交易
          </button>
        </div>
      </header>

      {/* 第一行：核心资产概览 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: '黄金总持有 (XAU)', balance: '14,261.672', unit: 'OZ', color: '#B6002A', trend: '+0.24%', val: '≈ ¥2.51亿' },
          { label: '白银总持有 (XAG)', balance: '876,100.000', unit: 'OZ', color: '#475569', trend: '-0.12%', val: '≈ ¥1.92亿' },
          { label: '铂金总持有 (XPT)', balance: '8,614.871', unit: 'OZ', color: '#0891b2', trend: '+1.05%', val: '≈ ¥0.61亿' },
          { label: '钯金总持有 (XPD)', balance: '6,088.418', unit: 'OZ', color: '#ea580c', trend: '+0.88%', val: '≈ ¥0.43亿' },
        ].map((item, idx) => (
          <div key={idx} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden group hover:border-[#B6002A] transition-all duration-300">
            <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{item.label}</div>
            <div className="text-2xl font-black text-slate-800 font-mono tracking-tight">{item.balance}</div>
            <div className="flex justify-between items-center mt-3">
              <span className="text-[10px] text-slate-400 font-bold uppercase">{item.val}</span>
              <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${item.trend.startsWith('+') ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                {item.trend}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* 第二行：核心工作流区 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-5 bg-[#B6002A] rounded-full"></div>
                <h2 className="font-bold text-slate-800">库存流转审批队列</h2>
              </div>
              <button className="text-[10px] font-black text-[#B6002A] hover:opacity-70 flex items-center gap-1 uppercase tracking-widest">
                流转中心 <ChevronRight size={14} />
              </button>
            </div>
            <div className="divide-y divide-slate-100">
              {[
                { type: 'INBOUND', metal: 'XAU (黄金)', amount: '250.000 KG', vault: '上海一号金库', requester: '张晓明', date: '10:45', priority: 'HIGH' },
                { type: 'OUTBOUND', metal: 'XAG (白银)', amount: '5,000.000 OZ', vault: '香港分行金库', requester: '李华', date: '09:20', priority: 'MEDIUM' },
                { type: 'INBOUND', metal: 'XPT (铂金)', amount: '120.500 KG', vault: '伦敦离岸金库', requester: '王伟', date: '昨日', priority: 'LOW' },
              ].map((item, idx) => (
                <div key={idx} className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors group">
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${item.type === 'INBOUND' ? 'bg-red-50 text-[#B6002A]' : 'bg-slate-100 text-slate-600'}`}>
                      {item.type === 'INBOUND' ? <ArrowDownLeft size={20} /> : <ArrowUpRight size={20} />}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-slate-800">{item.type === 'INBOUND' ? '入库申请' : '出库申请'} - {item.metal}</span>
                        {item.priority === 'HIGH' && <span className="bg-[#B6002A] text-white text-[8px] font-black px-1.5 py-0.5 rounded uppercase tracking-tighter">Urgent</span>}
                      </div>
                      <div className="text-[10px] text-slate-400 mt-1 font-bold uppercase">Requester: {item.requester} | {item.vault} | {item.date}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-8">
                    <div className="text-right">
                      <div className="text-sm font-black text-slate-800 font-mono">{item.amount}</div>
                      <div className="text-[9px] font-black text-[#B6002A] uppercase tracking-widest">Pending Review</div>
                    </div>
                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="px-3 py-1.5 bg-slate-900 text-white text-[10px] font-black rounded-lg hover:bg-black uppercase tracking-widest">Approve</button>
                      <button className="px-3 py-1.5 border border-slate-200 text-slate-600 text-[10px] font-black rounded-lg hover:bg-slate-50 uppercase tracking-widest">Reject</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h2 className="font-bold text-slate-800 mb-6 flex items-center gap-2">
              <TrendingUp size={18} className="text-[#B6002A]" />
              账户资产动态趋势
            </h2>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#B6002A" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="#B6002A" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10, fontWeight: 'bold'}} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10, fontWeight: 'bold'}} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                  />
                  <Area type="monotone" dataKey="value" stroke="#B6002A" strokeWidth={3} fill="url(#colorValue)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col h-full">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between">
              <h2 className="font-bold text-slate-800 flex items-center gap-2">
                <ListTodo size={18} className="text-[#B6002A]" />
                个人待办事项
              </h2>
              <span className="bg-[#B6002A] text-white text-[10px] font-black px-2 py-0.5 rounded-full">6</span>
            </div>
            <div className="p-4 space-y-3 flex-1">
              {[
                { title: '完成二季度黄金实物对账单', priority: 'HIGH', deadline: '17:00' },
                { title: '审核伦敦分行对手方信用度', priority: 'HIGH', deadline: '14:30' },
                { title: '下载归档本周转账凭证', priority: 'MEDIUM', deadline: '明日' },
              ].map((task, i) => (
                <div key={i} className="group flex items-start gap-3 p-3 rounded-xl border border-slate-100 hover:border-[#B6002A] transition-all cursor-pointer">
                  <div className="mt-1">
                    <div className="w-4 h-4 rounded border-2 border-slate-200 group-hover:border-[#B6002A] transition-colors"></div>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-800">{task.title}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`text-[8px] font-black px-1.5 py-0.5 rounded uppercase ${task.priority === 'HIGH' ? 'bg-red-50 text-[#B6002A]' : 'bg-slate-100 text-slate-500'}`}>
                        {task.priority === 'HIGH' ? '紧急' : '普通'}
                      </span>
                      <span className="text-[9px] text-slate-400 font-bold uppercase tracking-tighter flex items-center gap-1">
                        <Clock size={10} /> {task.deadline}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-4 border-t border-slate-100">
              <button className="w-full py-2 bg-slate-50 text-slate-600 rounded-lg text-[10px] font-black hover:bg-slate-100 transition-colors uppercase tracking-[0.2em]">
                + 添加新记录
              </button>
            </div>
          </div>

          <div className="bg-[#B6002A] text-white p-6 rounded-2xl shadow-xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <Zap size={100} fill="white" />
            </div>
            <h3 className="text-white/60 text-[10px] font-black uppercase tracking-[0.2em] mb-4">Market Status</h3>
            <div className="space-y-4 relative z-10">
              <div className="flex justify-between items-end border-b border-white/10 pb-3">
                <span className="text-white/70 text-[10px] font-bold uppercase">Pending Transfers</span>
                <span className="text-2xl font-black font-mono">30</span>
              </div>
              <div className="flex justify-between items-end">
                <span className="text-white/70 text-[10px] font-bold uppercase">Risk Level</span>
                <span className="text-2xl font-black font-mono">LOW</span>
              </div>
            </div>
            <button className="mt-6 w-full py-3 bg-white/10 hover:bg-white/20 rounded-xl text-[10px] font-black transition-all border border-white/20 uppercase tracking-[0.2em]">
              实时风控监控
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
