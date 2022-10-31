import React, { Component } from 'react';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    return (
      <div>Header</div>
    );
  }
}

export default connect()(Header);
