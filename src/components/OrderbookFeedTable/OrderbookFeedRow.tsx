import { currencyFormat } from 'helpers/helpers';
import useMobile from 'hooks/useMobile';
import { Feed } from 'types/types';
import './OrderbookFeedRow.scss';

const OrderbookFeedRow = ({ feed, feedType }: { feed: Feed[]; feedType: string }) => {
  const isMobile = useMobile();
  return (
    <>
      {feed.map((item) => (
        <div className={`orderbook-row orderbook-row--${feedType}`} key={item.ra}>
          <div className="orderbook-row__item">{item.ra}</div>
          {!isMobile && <div className="orderbook-row__item">{item.ca}</div>}
          <div className="orderbook-row__item">{currencyFormat(Number(item.ra) * Number(item.ca))}</div>
          {!isMobile && <div className="orderbook-row__item">{item.co}</div>}
        </div>
      ))}
    </>
  );
};

export default OrderbookFeedRow;
