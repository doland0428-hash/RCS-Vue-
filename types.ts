
export enum TabType {
  DASHBOARD = 'DASHBOARD',
  ACCOUNTS = 'ACCOUNTS',
  TRANSFERS = 'TRANSFERS',
  INVENTORY = 'INVENTORY',
  PROJECTION = 'PROJECTION',
  STATEMENTS = 'STATEMENTS',
  MAILBOX = 'MAILBOX'
}

export interface MetalAccount {
  id: string;
  type: 'GOLD' | 'SILVER' | 'PLATINUM' | 'PALLADIUM';
  accountNumber: string;
  balance: number;
  projectedBalance: number;
  unit: string;
}

export interface TransferRecord {
  id: string;
  valueDate: string;
  counterparty: string;
  metal: string;
  amount: number;
  type: 'PAY' | 'RECEIVE';
  status: 'PENDING' | 'ALLEGED' | 'CANCELLED' | 'PROCESSING' | 'UNMATCHED' | 'CONFIRMED';
  reference: string;
}

export interface ApprovalRecord {
  id: string;
  type: 'INBOUND' | 'OUTBOUND';
  metal: string;
  amount: number;
  vault: string;
  requestDate: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  requester: string;
}

export interface TodoItem {
  id: string;
  title: string;
  priority: 'HIGH' | 'MEDIUM' | 'LOW';
  dueDate: string;
  completed: boolean;
  category: string;
}
