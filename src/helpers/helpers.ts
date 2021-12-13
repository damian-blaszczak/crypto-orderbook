import { PushOrdersData, PushMarketStatsData, SnaptshotData } from 'types/types';
import { requestAction, orderbookPath, wsUrl, responseAction, marketStatsPath } from 'consts/consts';

export const currencyFormat = (amount: string | number) => Number(amount).toFixed(2);

export const spreadValue = (topBid: string, topAsk: string) =>
  topBid && topAsk ? (Number(topAsk) - Number(topBid)).toFixed(2) : '-';

export const apiCall = (path: string, action = requestAction.SUBSCRIBE_PUBLIC) =>
  JSON.stringify({
    action,
    module: 'trading',
    path
  });

export const snapshotCall = (path: string) =>
  JSON.stringify({
    requestId: '78539fe0-e9b0-4e4e-8c86-70b36aa93d4f',
    action: requestAction.PROXY,
    module: 'trading',
    path
  });

export const unsubscribeToMarket = (ws: WebSocket, marketCode: string) => {
  ws.send(apiCall(orderbookPath(marketCode), requestAction.UNSUBSCRIBE));
  ws.send(apiCall(marketStatsPath(marketCode), requestAction.UNSUBSCRIBE));
};

export const subscribeToMarket = (ws: WebSocket, marketCode: string) => {
  ws.send(snapshotCall(orderbookPath(marketCode)));
  ws.send(snapshotCall(marketStatsPath(marketCode)));
  ws.send(apiCall(orderbookPath(marketCode)));
  ws.send(apiCall(marketStatsPath(marketCode)));
};

export const initWs = (
  marketCode: string,
  handleDisconnect: () => void,
  handlePushOrders: (value: PushOrdersData) => void,
  handlePushMarketStats: (value: PushMarketStatsData) => void,
  handleOrdersSnapshot: (value: SnaptshotData) => void,
  handleMarketStatsSnapshot: (value: SnaptshotData) => void,
  handleSubscribe: () => void
) => {
  const ws = new WebSocket(wsUrl);

  ws.addEventListener('open', () => {
    ws.send(snapshotCall(orderbookPath(marketCode)));
    ws.send(snapshotCall(marketStatsPath(marketCode)));
    ws.send(apiCall(orderbookPath(marketCode)));
    ws.send(apiCall(marketStatsPath(marketCode)));
  });

  ws.addEventListener('error', handleDisconnect);
  ws.addEventListener('close', handleDisconnect);

  ws.addEventListener('message', (event) => {
    const data = JSON.parse(event.data);
    try {
      if (data.action === responseAction.PROXY_RESPONSE) {
        data.body.buy?.length ? handleOrdersSnapshot(data) : handleMarketStatsSnapshot(data);
      } else if (data.action === responseAction.PUSH && data.topic.split('/')[1] === 'orderbook-limited') {
        handlePushOrders(data);
      } else if (data.action === responseAction.PUSH && data.topic.split('/')[1] === 'stats') {
        handlePushMarketStats(data);
      } else if (data.action === responseAction.SUBSCRIBE_PUBLIC_CONFIRM) {
        handleSubscribe();
      }
    } catch (err) {
      console.log(err);
    }
  });
  return ws;
};
