import React, { useState, useEffect } from 'react';
import CreateAccountModal from '../../components/layout/createAccountModal/CreateAccountModal';
import { Front } from '../../img/index';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginUser, setMessage } from '../../actions/UserActions';
import M from 'materialize-css/dist/js/materialize.min.js';
import './LandingPage.css';

const LandingPage = ({ loginUser, setMessage, message }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
    loginUser({
      email: email,
      password: password,
    });
  };

  useEffect(() => {
    if (message) {
      M.toast({ html: message });
      setMessage(null);
    }
    //eslint-disable-next-line
  }, [message]);

  return (
    <>
      <div className='landingContainer row'>
        <div className='col m6 landingImgDiv hide-on-med-and-down'>
          <img className='landingImg' src={Front} alt='landing-img' />
        </div>
        <div className='col s12 l6 loginDiv'>
          <h1 className='instructionsHeader'>WORKOUT BUILDER</h1>
          <div className='row'>
            {/* <div className='col s8 offset-s2 xl6 offset-xl3 socialBtnDiv'>
              <a
                className='socialBtn facebook'
                href='#!'
                onClick={() => {
                  window.open(
                    'https://workout-builder-website.herokuapp.com/user/auth/facebook',
                    '_self'
                  );
                }}
              >
                <i className='fab fa-facebook' />
                &nbsp; Sign in with Facebook
              </a>
            </div> */}
          </div>
          <div className='row'>
            <div className='col s8 offset-s2 xl6 offset-xl3 socialBtnDiv'>
              <a
                className='socialBtn google'
                href='#!'
                onClick={() => {
                  window.open(
                    'https://workout-builder-website.herokuapp.com/user/auth/google',
                    '_self'
                  );
                }}
              >
                <i className='fab fa-google' /> &nbsp; Sign in with Google
              </a>
            </div>
          </div>
          <div className='row hrRow'>
            <div className='col s4 offset-s4 xl2 offset-xl5 hr'>
              <span>or</span>
            </div>
          </div>
          <form>
            <div className='row'>
              <div className='input-field col s8 xl6 offset-s2 offset-xl3'>
                <input
                  id='email'
                  type='email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <label htmlFor='email'>Email</label>
              </div>
            </div>
            <div className='row'>
              <div className='input-field col s8 xl6 offset-s2 offset-xl3'>
                <input
                  id='password'
                  type='password'
                  autoComplete='on'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <label htmlFor='password'>Password</label>
              </div>
            </div>
            <a className='signInButton' href='/home-page' onClick={onSubmit}>
              SIGN IN
            </a>
          </form>
          <p className='accountSubText'>
            <a href='#create-account-modal' className='modal-trigger'>
              Create an account{' '}
              <i className='material-icons tiny'>info_outline</i>
            </a>
          </p>
          <p className='accountSubText'>
            <a href='/muscle-group-selection' className='modal-trigger '>
              Continue as guest
            </a>
          </p>
        </div>
      </div>
      <CreateAccountModal />
    </>
  );
};

LandingPage.propTypes = {
  loginUser: PropTypes.func.isRequired,
  setMessage: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  message: state.user.message,
});

export default connect(mapStateToProps, { loginUser, setMessage })(LandingPage);
