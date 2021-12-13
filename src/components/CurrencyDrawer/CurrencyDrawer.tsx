import currenciesPairs from 'components/Orderbook/currenciesPairs';
import './CurrencyDrawer.scss';

const CurrencyDrawer = ({
  isOpen,
  handleClose,
  setMarketCode,
  activeMarketCode
}: {
  isOpen: boolean;
  handleClose: () => void;
  setMarketCode: (value: string) => void;
  activeMarketCode: string;
}) => {
  const selectPair = (pair: string) => {
    setMarketCode(pair);
    handleClose();
  };

  return (
    <>
      <div className={`currencyDrawer ${isOpen ? 'currencyDrawer--open' : ''}`}>
        <div className="currencyDrawer__closeIcon" onClick={handleClose} />
        {currenciesPairs.map((marketCode) => (
          <div
            key={marketCode}
            className={`currencyDrawer__item ${
              activeMarketCode === marketCode ? 'currencyDrawer__item--selected' : ''
            }`}
            onClick={() => selectPair(marketCode)}
          >
            {marketCode}
          </div>
        ))}
      </div>
      <div
        onClick={handleClose}
        className={`currencyDrawer__overlay ${isOpen ? 'currencyDrawer__overlay--open' : ''}`}
      />
    </>
  );
};

export default CurrencyDrawer;
