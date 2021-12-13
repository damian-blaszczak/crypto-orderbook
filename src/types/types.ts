export type Feed = {
  ca: string;
  co: number;
  pa: string;
  ra: string;
  sa: string;
};

export type OrderbookProps = {
  bid: Feed[];
  ask: Feed[];
  marketStats: {
    max: number | '-';
    min: number | '-';
  };
  setMarketCode: (value: string) => void;
  marketCode: string;
};

export type MarketStats = {
  h: number;
  l: number;
  m: string;
  r24h: number;
  v: number;
};

export type MarketStatsSnapshotBody = {
  stats: MarketStats;
  status: string;
};

export type OrdersSnapshotBody = {
  buy: Feed[];
  sell: Feed[];
  seqNo: string;
  status: string;
  timestamp: string;
};

export type SnaptshotData = {
  action: string;
  body: OrdersSnapshotBody | MarketStatsSnapshotBody;
  requestId: string;
  statusCode: number;
};

type OrderChanges = {
  action: string;
  entryType: string;
  marketCode: string;
  rate: string;
  state: Feed[];
};

export type PushOrdersData = {
  action: string;
  message: {
    changes: OrderChanges[];
  };
  seqNo: number;
  timestamp: string;
  topic: string;
};

export type PushMarketStatsData = {
  action: string;
  message: MarketStats[];
  seqNo: number;
  timestamp: string;
  topic: string;
};
