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
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      exchangeRates: {},
      total: 0,
      check: 1,
    };
  }

  componentDidUpdate() {
    const { check } = this.state;
    const { data: { wallet } } = this.props;
    const { items, editMode } = wallet;
    if (items && editMode && check === 1) {
      this.setState({
        id: items.id,
        value: items.value,
        description: items.description,
        method: items.method,
        tag: items.tag,
        currency: items.currency,
        check: 0,
      });
    }
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  render() {
    const { data, dispatch } = this.props;
    const { wallet } = data;
    const { currencies, editMode, items, position } = wallet;
    const { currency, value, description, method, tag } = this.state;
    return (
      <div>
        <div className="div__wallet">
          <label htmlFor="description" className="label__top">
            Descrição da despesa
            <input
              data-testid="description-input"
              name="description"
              onChange={ this.handleChange }
              value={ description }
            />
          </label>
          <label htmlFor="tag" className="label__top">
            Categoria da despesa
            <select
              data-testid="tag-input"
              name="tag"
              value={ tag }
              onChange={ this.handleChange }
            >
              <option>Alimentação</option>
              <option>Lazer</option>
              <option>Trabalho</option>
              <option>Transporte</option>
              <option>Saúde</option>
            </select>
          </label>
          <label htmlFor="value" className="label__botton">
            Valor
            <input
              data-testid="value-input"
              name="value"
              type="number"
              onChange={ this.handleChange }
              value={ (value) }
            />
          </label>
          <label htmlFor="method" className="label__botton">
            Método de pagamento
            <select
              data-testid="method-input"
              name="method"
              value={ method }
              onChange={ this.handleChange }
            >
              <option>Dinheiro</option>
              <option>Cartão de crédito</option>
              <option>Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="currency" className="label__botton">
            Moeda
            <select
              data-testid="currency-input"
              onChange={ this.handleChange }
              name="currency"
              value={ currency }
            >
              {currencies.map((element, key) => <option key={ key }>{element}</option>)}
            </select>
          </label>
        </div>
        <div className="div__button">
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
                  this.setState({ check: 1 });
                } }
              >
                Editar despesa
              </button>
            )}
        </div>
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
