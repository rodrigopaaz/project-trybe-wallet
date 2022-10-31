import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addUser, thunkCurrency } from '../redux/actions';

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
    dispatch(thunkCurrency('all'));
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
        <div>
          Login
          <div>
            <label htmlFor="email">
              Email
              <input
                type="text"
                data-testid="email-input"
                name="email"
                onChange={ this.handleChange }

              />
            </label>
            <label htmlFor="password">
              Senha
              <input
                type="password"
                data-testid="password-input"
                name="password"
                onChange={ this.handleChange }

              />
            </label>
            <button
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
      )
    );
  }
}

Login.propTypes = ({
  history: PropTypes.string,
  push: PropTypes.string,
}).isRequired;

export default connect()(Login);
