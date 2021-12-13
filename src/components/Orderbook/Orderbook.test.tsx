import { fireEvent, render, screen } from '@testing-library/react';
import { OrderbookProps } from 'types/types';
import Orderbook from './Orderbook';

const props: OrderbookProps = {
  bid: [
    { ra: '195201.1', ca: '0.02', sa: '0.02', pa: '0.02', co: 1 },
    { ra: '195250', ca: '0.01', sa: '0.01', pa: '0.01', co: 1 },
    { ra: '195294.81', ca: '0.00102409', sa: '0.00102409', pa: '0.00102409', co: 1 },
    { ra: '195333', ca: '0.00113728', sa: '0.00113728', pa: '0.00113728', co: 2 },
    { ra: '195400', ca: '0.02535312', sa: '0.02535312', pa: '0.02535312', co: 2 }
  ],
  ask: [
    { ra: '199091.12', ca: '0.15490954', sa: '0.15490954', pa: '0.15490954', co: 1 },
    { ra: '199091.13', ca: '1.529897', sa: '1.529897', pa: '1.529897', co: 1 },
    { ra: '199091.15', ca: '1.0338000', sa: '1.0338000', pa: '1.0338000', co: 1 },
    { ra: '199091.16', ca: '0.0521775', sa: '0.0521775', pa: '0.0521775', co: 1 },
    { ra: '199982.9', ca: '0.2000', sa: '0.2000', pa: '0.2000', co: 1 }
  ],
  marketStats: {
    max: 208499.99,
    min: 197570.01
  },
  setMarketCode: jest.fn(),
  marketCode: 'BTC-PLN'
};

describe('Orderbook', () => {
  it('should render correctly', () => {
    const { container } = render(<Orderbook {...props} />);

    expect(container).toMatchSnapshot();
  });

  it('should render spread correctly', () => {
    render(<Orderbook {...props} />);

    const el = screen.getByTestId('spreadValue');
    const spreadValue = (Number(props.ask[0].ra) - Number(props.bid[0].ra)).toFixed(2);

    expect(el).toBeInTheDocument();
    expect(el).toHaveTextContent(spreadValue);
  });

  it('should render orderbook table when there are any bids and asks', () => {
    render(<Orderbook {...props} />);

    expect(screen.getByTestId('orderbook-table')).toBeInTheDocument();
  });

  it('should not render orderbook table when there are not any bids and asks', () => {
    const propsWithoutFeeds = {
      ...props,
      bid: [],
      ask: []
    };
    render(<Orderbook {...propsWithoutFeeds} />);

    expect(screen.queryByTestId('orderbook-table')).not.toBeInTheDocument();
    expect(screen.getByTestId('orderbook-loader')).toBeInTheDocument();
  });

  it('should open currencies drawer on click button and close when currency chosen', async () => {
    render(<Orderbook {...props} />);

    fireEvent.click(screen.getByTestId('currencies-button'));

    expect(screen.getByTestId('currency-drawer').className).toEqual('currencyDrawer currencyDrawer--open');

    fireEvent.click(screen.getAllByTestId('currency-item')[3]);

    expect(screen.getByTestId('currency-drawer').className).toEqual('currencyDrawer ');
  });
});
