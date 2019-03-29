import React from 'react';

const cc = require('cryptocompare');

export const AppContext = React.createContext();

export class AppProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 'dashboard',
      ...this.savedSettings(),
      setPage: this.setPage,
      confirmFavorites: this.confirmFavorites
    };
  }

  componentDidMount = () => {
    this.fetchCoins();
  };

  fetchCoins = async () => {
    let coinList = (await cc.coinList()).Data;
    this.setState({ coinList });
  };

  confirmFavorites = () => {
    console.log('hello');
    this.setState({
      firstVisit: false,
      page: 'dashboard'
    });
    localStorage.setItem('crypthoDash', JSON.stringify({ test: 'hello' }));
  };

  setPage = page => this.setState({ page });

  savedSettings() {
    let crypthoDashData = JSON.parse(localStorage.getItem('crypthoDash'));
    if (!crypthoDashData) {
      return { page: 'settings', firstVisit: true };
    }
    return {};
  }

  render() {
    return (
      <AppContext.Provider value={this.state}>
        {this.props.children}
      </AppContext.Provider>
    );
  }
}
