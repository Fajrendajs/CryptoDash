import React from 'react';
import _ from 'lodash';

const cc = require('cryptocompare');

const MAX_FAVORITES = 10;

export const AppContext = React.createContext();

export class AppProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 'dashboard',
      favorites: ['BTC', 'ETH', 'XMR', 'DOGE'],
      ...this.savedSettings(),
      setPage: this.setPage,
      addCoin: this.addCoin,
      removeCoin: this.removeCoin,
      isInfavorites: this.isInfavorites,
      setFilteredCoins: this.setFilteredCoins,
      confirmFavorites: this.confirmFavorites
    };
  }

  componentDidMount = () => {
    this.fetchCoins();
    this.fetchPrices();
  };

  addCoin = key => {
    let favorites = [...this.state.favorites];
    if (favorites.length < MAX_FAVORITES) {
      favorites.push(key);
      this.setState({ favorites });
    }
  };

  removeCoin = key => {
    let favorites = [...this.state.favorites];
    this.setState({ favorites: _.pull(favorites, key) });
  };

  isInfavorites = key => _.includes(this.state.favorites, key);

  fetchCoins = async () => {
    let coinList = (await cc.coinList()).Data;
    this.setState({ coinList });
  };

  confirmFavorites = () => {
    console.log('hello');
    this.setState(
      {
        firstVisit: false,
        page: 'dashboard'
      },
      () => {
        this.fetchPrices();
      }
    );
    localStorage.setItem(
      'crypthoDash',
      JSON.stringify({ favorites: this.state.favorites })
    );
  };

  setPage = page => this.setState({ page });

  fetchPrices = async () => {
    if (this.state.firstVisit) return;
    let prices = await this.prices();
    console.log(prices);
    this.setState({ prices });
  };

  prices = async () => {
    let returnData = [];
    for (let i = 0; i < this.state.favorites.length; i++) {
      try {
        let priceData = await cc.priceFull(this.state.favorites[i], 'USD');
        returnData.push(priceData);
      } catch (e) {
        console.warn('fetch price error: ', e);
      }
    }
    return returnData;
  };

  savedSettings() {
    let crypthoDashData = JSON.parse(localStorage.getItem('crypthoDash'));
    if (!crypthoDashData) {
      return { page: 'settings', firstVisit: true };
    }
    let { favorites } = crypthoDashData;
    return { favorites };
  }

  setFilteredCoins = filteredCoins => this.setState({ filteredCoins });

  render() {
    return (
      <AppContext.Provider value={this.state}>
        {this.props.children}
      </AppContext.Provider>
    );
  }
}
