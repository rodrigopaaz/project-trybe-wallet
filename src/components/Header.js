import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { data } = this.props;
    const { user, wallet } = data;
    return (
      <div>
        <p data-testid="email-field">{user.email}</p>
        <p data-testid="total-field">{wallet.total}</p>
        <p data-testid="header-currency-field">BRL</p>
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
