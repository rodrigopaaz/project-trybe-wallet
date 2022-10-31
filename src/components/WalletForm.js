import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class WalletForm extends Component {
  render() {
    const { data } = this.props;
    const { wallet } = data;
    const { currencies } = wallet;
    return (
      <div>
        <p data-testid="value-input">0</p>
        <p data-testid="description-input">Description</p>
        <select data-testid="currency-input">
          {currencies.map((element, key) => <option key={ key }>{element}</option>)}
        </select>

        <select data-testid="method-input">
          <option>Dinheiro</option>
          <option>Cartão de crédito</option>
          <option>Cartão de débito</option>
        </select>
        <select data-testid="tag-input">
          <option>Alimentação</option>
          <option>Lazer</option>
          <option>Trabalho</option>
          <option>Transporte</option>
          <option>Saúde</option>
        </select>
      </div>
    );
  }
}

const mapStateToProps = (store) => ({
  data: store,
});

WalletForm.propTypes = ({
  data: PropTypes.shape,
  wallet: PropTypes.shape,
  currencies: PropTypes.string,
}).isRequired;

export default connect(mapStateToProps)(WalletForm);
