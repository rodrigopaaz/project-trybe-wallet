import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addUser, thunkCurrency } from '../redux/actions';
import walletLogo from '../img/walletLogo.png';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(thunkCurrency());
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  validMail = (value) => {
    const check = /\S+@\S+\.\S+/;
    return check.test(value);
  };

  render() {
    const { history, dispatch } = this.props;
    const { email, password } = this.state;
    return (
      (
        <div className="main__login">

          <div className="div__login">
            <div className="div__title">
              <img src={ walletLogo } alt="wallet-logo" className="login__title" />
            </div>
            <div className="div__form">
              <label htmlFor="email">
                <input
                  style={ this.validMail(email) ? { borderStyle: 'solid',
                    borderWidth: '1px',
                    borderColor: 'green' } : { borderStyle: 'solid',
                    borderWidth: '1px',
                    borderColor: '#003BE5' } }
                  type="text"
                  data-testid="email-input"
                  name="email"
                  placeholder="Email"
                  onChange={ this.handleChange }

                />
              </label>
              <label htmlFor="password">
                <input
                  style={ password.length >= Number('6') ? { borderStyle: 'solid',
                    borderWidth: '1px',
                    borderColor: 'green' } : { borderStyle: 'solid',
                    borderWidth: '1px',
                    borderColor: '#003BE5' } }
                  type="password"
                  data-testid="password-input"
                  name="password"
                  placeholder="Senha"
                  onChange={ this.handleChange }

                />
              </label>
              <button
                style={ this.validMail(email)
                  && password.length >= Number('6') ? { borderStyle: 'solid',
                    borderWidth: '1px',
                    borderColor: 'green',
                    backgroundColor: '#022c16' } : { borderStyle: 'solid',
                    borderWidth: '1px',
                    borderColor: '#003BE5',
                    backgroundColor: '#003BE5' } }
                type="button"
                disabled={
                  !(this.validMail(email) && password.length >= Number('6'))
                }
                onClick={ () => {
                  history.push('/carteira');
                  dispatch(addUser(email));
                } }
              >
                Entrar
              </button>
            </div>
          </div>
        </div>
      )
    );
  }
}

Login.propTypes = ({
  history: PropTypes.string,
  push: PropTypes.string,
}).isRequired;

export default connect()(Login);
