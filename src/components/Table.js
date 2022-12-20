import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import btnEdit from '../img/btn_edit.png';
import btnRemove from '../img/btn_remove.png';
import { removeExpense, editExpense } from '../redux/actions';

class Table extends Component {
  render() {
    const { wallet, dispatch } = this.props;
    const { expenses } = wallet;

    if (expenses.length > 0) {
      return (
        <div className="div__table__button">
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
                <tr key={ element.id }>
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
                    <img
                      src={ btnEdit }
                      alt="add"
                      className="button__add"
                      data-testid="edit-btn"
                      type="button"
                      onClick={ () => { dispatch(editExpense(index, element, true)); } }
                    />
                    <img
                      src={ btnRemove }
                      alt="add"
                      className="button__delete"
                      data-testid="delete-btn"
                      type="button"
                      onClick={ () => { dispatch(removeExpense(index, element)); } }
                    />

                  </td>
                </tr>))}
            </tbody>

          </table>
        </div>
      );
    }

    return (
      <div className="div__insert__expense">
        <p className="no__expense__message">Insira uma despesa</p>
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
