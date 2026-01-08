
import React, { useState } from 'react';
import { 
  Plus, 
  Upload, 
  Search, 
  Filter, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  MoreVertical,
  ChevronDown
} from 'lucide-react';

const Transfers: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState('ALL');

  const statusCounts = [
    { label: '总计', count: 51, color: 'text-slate-800', bg: 'bg-slate-100' },
    { label: '待授权', count: 30, color: 'text-amber-600', bg: 'bg-amber-50' },
    { label: '声称转账', count: 1, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: '处理中', count: 10, color: 'text-cyan-600', bg: 'bg-cyan-50' },
    { label: '未匹配', count: 7, color: 'text-red-600', bg: 'bg-red-50' },
    { label: '已确认', count: 3, color: 'text-green-600', bg: 'bg-green-50' },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">转账清算 (Transfers)</h1>
          <p className="text-slate-500">实时管理您的金属转账和收支指令</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 border border-amber-500 text-amber-600 font-medium rounded-lg hover:bg-amber-50 flex items-center gap-2 text-sm shadow-sm transition-all">
            <Upload size={16} /> 批量上传
          </button>
          <button className="px-4 py-2 bg-amber-500 text-slate-900 font-bold rounded-lg hover:bg-amber-600 flex items-center gap-2 text-sm shadow-sm transition-all">
            <Plus size={18} /> 新建转账
          </button>
        </div>
      </header>

      {/* Status Summary */}
      <div className="flex flex-wrap gap-2">
        {statusCounts.map((s, i) => (
          <button 
            key={i} 
            className={`flex flex-col items-start px-6 py-4 rounded-xl border transition-all ${s.bg} border-transparent hover:border-slate-200 min-w-[120px]`}
          >
            <span className="text-xs font-bold text-slate-500 mb-1">{s.label}</span>
            <span className={`text-2xl font-black ${s.color}`}>{s.count}</span>
          </button>
        ))}
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex gap-2">
            {['全部', '待办', '处理中', '已完成'].map((tab) => (
              <button 
                key={tab}
                onClick={() => setActiveSubTab(tab)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  activeSubTab === tab ? 'bg-slate-900 text-white' : 'text-slate-500 hover:bg-slate-50'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input 
                type="text" 
                placeholder="搜索交易号、对手方..." 
                className="w-full pl-10 pr-4 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
              />
            </div>
            <button className="p-2 border border-slate-200 rounded-lg hover:bg-slate-50 text-slate-600">
              <Filter size={20} />
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 text-slate-500 text-xs font-bold uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4">币种/金属</th>
                <th className="px-6 py-4">价值日</th>
                <th className="px-6 py-4">对手方</th>
                <th className="px-6 py-4">支付/接收</th>
                <th className="px-6 py-4">金额 (OZ)</th>
                <th className="px-6 py-4">状态</th>
                <th className="px-6 py-4 text-right">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {[
                { metal: 'XAU (黄金)', date: '2024-05-28', counterparty: 'J.P. Morgan Chase', type: 'PAY', amount: '10,000.250', status: 'PROCESSING', statusLabel: '处理中' },
                { metal: 'XPT (铂金)', date: '2024-05-29', counterparty: 'Wells Fargo Securities', type: 'REC', amount: '9,999.001', status: 'PENDING', statusLabel: '待授权' },
                { metal: 'XAG (白银)', date: '2024-05-30', counterparty: 'Citigroup Partners', type: 'PAY', amount: '500,000.000', status: 'UNMATCHED', statusLabel: '未匹配' },
                { metal: 'XAU (黄金)', date: '2024-05-28', counterparty: 'ICBC (Asia) Ltd', type: 'REC', amount: '1,500.000', status: 'CONFIRMED', statusLabel: '已确认' },
                { metal: 'XPD (钯金)', date: '2024-06-01', counterparty: 'Babcock & Brown', type: 'REC', amount: '50.000', status: 'ALLEGED', statusLabel: '声称转账' },
              ].map((item, idx) => (
                <tr key={idx} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-6 py-4 font-bold text-slate-800">{item.metal}</td>
                  <td className="px-6 py-4 text-slate-500">{item.date}</td>
                  <td className="px-6 py-4 text-slate-600">{item.counterparty}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-md text-[10px] font-black uppercase ${
                      item.type === 'PAY' ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'
                    }`}>
                      {item.type === 'PAY' ? '支出' : '收入'}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-mono font-medium text-slate-800">{item.amount}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {item.status === 'CONFIRMED' && <CheckCircle2 size={14} className="text-green-500" />}
                      {item.status === 'PENDING' && <Clock size={14} className="text-amber-500" />}
                      {item.status === 'UNMATCHED' && <AlertCircle size={14} className="text-red-500" />}
                      <span className="font-medium">{item.statusLabel}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-1.5 rounded-lg hover:bg-slate-200 text-slate-400 group-hover:text-slate-600 transition-colors">
                      <MoreVertical size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="p-4 border-t border-slate-100 flex justify-between items-center text-xs text-slate-500">
          <span>显示 1 至 5 项，共 51 项交易</span>
          <div className="flex gap-1">
            <button className="px-3 py-1.5 border rounded-lg hover:bg-slate-50 disabled:opacity-50" disabled>上一页</button>
            <button className="px-3 py-1.5 bg-slate-100 border rounded-lg font-bold">1</button>
            <button className="px-3 py-1.5 border rounded-lg hover:bg-slate-50">2</button>
            <button className="px-3 py-1.5 border rounded-lg hover:bg-slate-50">3</button>
            <button className="px-3 py-1.5 border rounded-lg hover:bg-slate-50">下一页</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Transfers;
