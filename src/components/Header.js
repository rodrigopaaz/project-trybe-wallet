import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { HiOutlineUserCircle } from 'react-icons/hi';
import moedasLogo from '../img/Moedas.png';
import walletLogo from '../img/walletLogo.png';

class Header extends Component {
  render() {
    const { data } = this.props;
    const { user, wallet } = data;
    console.log(wallet);
    return (
      <div className="div__header">
        <div>
          <img src={ walletLogo } alt="logo" className="img__wallet" />
          <p className="total__expenses">
            <img src={ moedasLogo } alt="moedas" className="img__moedas" />
            <b><span className="total__bold">Total de despesas:</span></b>
            {' '}
            {wallet.expenses.length === 0 ? (0).toFixed(2) : wallet.total}
            {' '}
            BRL
          </p>
          <div>
            <HiOutlineUserCircle className="icon__email" />
            <p className="header__email" data-testid="email-field">{user.email}</p>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  data: state,
});

Header.propTypes = ({
  data: PropTypes.shape,
}).isRequired;

export default connect(mapStateToProps)(Header);
