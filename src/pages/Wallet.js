import React from 'react';
import Header from '../components/Header';
import Table from '../components/Table';
import WalletForm from '../components/WalletForm';

class Wallet extends React.Component {
  render() {
    return (
      (
        <div className="main__wallet">
          <Header />
          <div className="div__table">
            <WalletForm />
            <Table />
          </div>
        </div>
      )
    );
  }
}

export default Wallet;
