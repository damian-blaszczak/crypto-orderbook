import { useEffect, useRef, useState } from 'react';
import { initWs, subscribeToMarket, unsubscribeToMarket } from 'helpers/helpers';
import Orderbook from 'components/Orderbook/Orderbook';
import {
  Feed,
  PushOrdersData,
  PushMarketStatsData,
  SnaptshotData,
  OrdersSnapshotBody,
  MarketStatsSnapshotBody
} from 'types/types';

const OrderbookContainer = () => {
  const [bid, setBid] = useState<Feed[]>([]);
  const [ask, setAsk] = useState<Feed[]>([]);
  const [updatedBid, setUpdatedBid] = useState<Feed[]>([]);
  const [updatedAsk, setUpdatedAsk] = useState<Feed[]>([]);
  const [marketCode, setMarketCode] = useState('BTC-PLN');
  const [marketStats, setMarketStats] = useState<{ max: number | '-'; min: number | '-' }>({ max: '-', min: '-' });
  const wsRef = useRef<WebSocket | null>(null);
  const preparedBid = [...new Map(bid.map((item) => [item['ra'], item])).values()]
    .slice(0, 25)
    .sort((a, b) => Number(b.ra) - Number(a.ra));
  const preparedAsk = [...new Map(ask.map((item) => [item['ra'], item])).values()]
    .slice(0, 25)
    .sort((a, b) => Number(a.ra) - Number(b.ra));

  const disconnect = () => {
    if (wsRef.current) {
      wsRef.current.close();
      wsRef.current = null;
    }
  };

  const handleOrdersSnapshot = (data: SnaptshotData) => {
    setBid((data.body as OrdersSnapshotBody).buy.sort((a, b) => Number(b.ra) - Number(a.ra)).slice(0, 25));
    setAsk((data.body as OrdersSnapshotBody).sell.sort((a, b) => Number(a.ra) - Number(b.ra)).slice(0, 25));
  };

  const handleMarketStatsSnapshot = (data: SnaptshotData) => {
    const max24h = (data.body as MarketStatsSnapshotBody).stats.h;
    const min24h = (data.body as MarketStatsSnapshotBody).stats.l;
    setMarketStats({ max: max24h, min: min24h });
  };

  const handlePushOrders = (data: PushOrdersData) => {
    setUpdatedBid(
      data.message.changes
        .filter((item) => item.state && item.entryType === 'Buy')
        .map((item) => item.state)
        .flat()
    );
    setUpdatedAsk(
      data.message.changes
        .filter((item) => item.state && item.entryType === 'Sell')
        .map((item) => item.state)
        .flat()
    );
  };

  const handlePushMarketStats = (data: PushMarketStatsData) => {
    const max24h = data.message[0].h;
    const min24h = data.message[0].l;
    setMarketStats({ max: max24h, min: min24h });
  };

  const handleSubscribe = () => {
    setUpdatedBid([]);
    setUpdatedAsk([]);
  };

  const initFeed = (newMarketCode: string) => {
    wsRef.current = initWs(
      newMarketCode,
      disconnect,
      handlePushOrders,
      handlePushMarketStats,
      handleOrdersSnapshot,
      handleMarketStatsSnapshot,
      handleSubscribe
    );
  };

  const connect = () => {
    if (!navigator.onLine) {
      return;
    }
    initFeed(marketCode);
  };

  useEffect(
    () => () => {
      if (wsRef.current) {
        unsubscribeToMarket(wsRef.current, marketCode);
      }
    },
    [marketCode]
  );

  useEffect(() => {
    if (wsRef.current && wsRef.current?.readyState === wsRef.current?.OPEN) {
      subscribeToMarket(wsRef.current, marketCode);
    }
  }, [marketCode]);

  useEffect(() => {
    connect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (bid.length > 200) {
      const newBid = [...new Map(bid.map((item) => [item['ra'], item])).values()].slice(0, 25);
      setBid(newBid);
    }
    if (ask.length > 200) {
      const newAsk = [...new Map(ask.map((item) => [item['ra'], item])).values()].slice(0, 25);
      setAsk(newAsk);
    }
  }, [bid.length, ask.length, bid, ask]);

  useEffect(() => {
    bid.unshift(...updatedBid);
    ask.unshift(...updatedAsk);
  }, [updatedBid, updatedAsk, bid, ask]);

  return (
    <Orderbook
      bid={preparedBid}
      ask={preparedAsk}
      marketStats={marketStats}
      setMarketCode={setMarketCode}
      marketCode={marketCode}
    />
  );
};

export default OrderbookContainer;
