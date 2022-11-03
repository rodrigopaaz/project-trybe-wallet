import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { editExpense, thunkCurrency } from '../redux/actions';

class WalletForm extends Component {
  constructor() {
    super();
    this.state = {
      id: 0,
      value: '',
      description: 'Description',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      exchangeRates: {},
      total: 0,
    };
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  render() {
    const { data, dispatch } = this.props;
    const { wallet } = data;
    const { currencies, editMode, items, position } = wallet;
    const { currency, value, description } = this.state;
    return (
      <div>

        <input
          data-testid="value-input"
          name="value"
          onChange={ this.handleChange }
          value={ value }
        />
        <input
          data-testid="description-input"
          name="description"
          onChange={ this.handleChange }
          value={ description }
        />
        <select
          data-testid="currency-input"
          onChange={ this.handleChange }
          name="currency"
        >
          {currencies.map((element, key) => <option key={ key }>{element}</option>)}
        </select>

        <select
          data-testid="method-input"
          name="method"
          onChange={ this.handleChange }
        >
          <option>Dinheiro</option>
          <option>Cartão de crédito</option>
          <option>Cartão de débito</option>
        </select>
        <select
          data-testid="tag-input"
          name="tag"
          onChange={ this.handleChange }
        >
          <option>Alimentação</option>
          <option>Lazer</option>
          <option>Trabalho</option>
          <option>Transporte</option>
          <option>Saúde</option>
        </select>
        ;
        { !editMode
          ? (
            <button
              type="button"
              /*   onClick={ () => dispatch(addExpenses(this.state, wallet)) } */
              onClick={ () => {
                this.setState({ value: '', description: '' });
                dispatch(thunkCurrency(this.state, wallet, value, currency));
              } }
            >
              Adicionar despesa
            </button>
          )
          : (
            <button
              type="button"
              /*   onClick={ () => dispatch(addExpenses(this.state, wallet)) } */
              onClick={ () => {
                this.setState({ value: '', description: '' });
                dispatch(editExpense(position, items, false, this.state));
              } }
            >
              Editar despesa
            </button>
          )}
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
