import OrderbookFeedTable from 'components/OrderbookFeedTable/OrderbookFeedTable';
import { OrderbookProps } from 'types/types';
import './Orderbook.scss';
import { spreadValue } from 'helpers/helpers';
import Loader from 'components/Loader/Loader';
import { useState } from 'react';
import CurrencyDrawer from 'components/CurrencyDrawer/CurrencyDrawer';

const Orderbook = ({ bid, ask, marketStats, setMarketCode, marketCode }: OrderbookProps) => {
  const [isCurrencyDrawerOpen, setCurrencyDrawerOpen] = useState(false);
  return (
    <div className="orderbook">
      <div className="orderbook__header">
        <div className="orderbook__header-item">
          <button
            className="orderbook__button"
            data-testid="currencies-button"
            onClick={() => setCurrencyDrawerOpen(true)}
          >
            {marketCode}
          </button>
        </div>
        <div className="orderbook__header-item">
          <div className="orderbook__header-item-title">Spread:</div>
          <div className="orderbook__header-item-value" data-testid="spreadValue">
            {spreadValue(bid[0]?.ra, ask[0]?.ra)}
          </div>
        </div>
        <div className="orderbook__header-item">
          <div className="orderbook__market-stats">
            <div className="orderbook__market-stats-item">
              <span>Najwyższa (24h)</span> <span>{marketStats.max}</span>
            </div>
            <div className="orderbook__market-stats-item">
              <span>Najniższa (24h)</span> <span>{marketStats.min}</span>
            </div>
          </div>
        </div>
      </div>
      {bid.length && ask.length ? (
        <div className="orderbook__container" data-testid="orderbook-table">
          <OrderbookFeedTable feed={bid} feedType="bid" marketCode={marketCode} />
          <OrderbookFeedTable feed={ask} feedType="ask" marketCode={marketCode} />
        </div>
      ) : (
        <Loader />
      )}
      <CurrencyDrawer
        isOpen={isCurrencyDrawerOpen}
        handleClose={() => setCurrencyDrawerOpen(false)}
        setMarketCode={setMarketCode}
        activeMarketCode={marketCode}
      />
    </div>
  );
};

export default Orderbook;
