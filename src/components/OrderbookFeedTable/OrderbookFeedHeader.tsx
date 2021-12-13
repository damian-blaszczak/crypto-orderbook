import useMobile from 'hooks/useMobile';
import './OrderbookFeedHeader.scss';

const OrderbookFeedHeader = ({ feedType, marketCode }: { feedType: string; marketCode: string }) => {
  const isMobile = useMobile();
  const cryptocurrency = marketCode.split('-')[0];
  const currency = marketCode.split('-')[1];
  return (
    <div className={`orderbook-header orderbook-header--${feedType}`}>
      <div className="orderbook-header__item">
        <span className="orderbook-header__prefix">{feedType}</span> - {feedType === 'bid' ? 'kupno' : 'sprzedaż'}
      </div>
      {!isMobile && <div className="orderbook-header__item">ilość ({cryptocurrency})</div>}
      <div className="orderbook-header__item">wartość ({currency})</div>
      {!isMobile && <div className="orderbook-header__item">liczba ofert</div>}
    </div>
  );
};

export default OrderbookFeedHeader;
