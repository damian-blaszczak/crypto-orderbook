import { Feed } from 'types/types';
import OrderbookFeedHeader from './OrderbookFeedHeader';
import OrderbookFeedRow from './OrderbookFeedRow';

const OrderbookFeedTable = ({ feed, feedType, marketCode }: { feed: Feed[]; feedType: string; marketCode: string }) => (
  <div>
    <OrderbookFeedHeader feedType={feedType} marketCode={marketCode} />
    <OrderbookFeedRow feed={feed} feedType={feedType} />
  </div>
);

export default OrderbookFeedTable;
