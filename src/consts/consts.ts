// Consts
export const requestsLimit = 50;

export const requestAction = {
  SUBSCRIBE_PUBLIC: 'subscribe-public',
  PROXY: 'proxy',
  UNSUBSCRIBE: 'unsubscribe'
};

export const responseAction = {
  PROXY_RESPONSE: 'proxy-response',
  PUSH: 'push',
  SUBSCRIBE_PUBLIC_CONFIRM: 'subscribe-public-confirm'
};

// Urls
export const wsUrl = 'wss://api.zonda.exchange/websocket/';
export const orderbookPath = (marketCode: string) => `orderbook-limited/${marketCode}/${requestsLimit}`;
export const marketStatsPath = (marketCode: string) => `stats/${marketCode}`;
