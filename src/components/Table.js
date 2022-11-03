import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { removeExpense, editExpense } from '../redux/actions';

class Table extends Component {
  render() {
    const { wallet, dispatch } = this.props;
    const { expenses } = wallet;

    return (
      <div>
        <table className="tableCosts">
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Editar/Excluir</th>
            </tr>
          </thead>
          <tbody>
            { expenses.map((element, index) => (
              <tr key={ element.description }>
                <td>{element.description}</td>
                <td>{element.tag}</td>
                <td>{element.method}</td>
                <td>{(Number(element.value)).toFixed(2)}</td>
                <td>{element.exchangeRates[element.currency].name}</td>
                <td>
                  {(Number(element.exchangeRates[element.currency].ask))
                    .toFixed(2)}

                </td>
                <td>
                  {(element.value * [element.exchangeRates[element.currency].ask])
                    .toFixed(2)}

                </td>
                <td>Real</td>
                <td>
                  <button
                    data-testid="edit-btn"
                    type="button"
                    onClick={ () => { dispatch(editExpense(index, element, true)); } }
                  >
                    Editar
                  </button>
                  <button
                    data-testid="delete-btn"
                    type="button"
                    onClick={ () => { dispatch(removeExpense(index, element)); } }
                  >
                    Excluir
                  </button>

                </td>
              </tr>))}
          </tbody>

        </table>
      </div>
    );
  }
}

Table.propTypes = ({
  wallet: PropTypes.shape,
  expenses: PropTypes.shape,
}).isRequired;

const mapStateToProps = (state) => ({
  wallet: state.wallet,
});

export default connect(mapStateToProps)(Table);
