import React, { useState, useEffect } from 'react';
import Icon from '../../img/icon.png';
import CreatePlanImg from '../../img/createPlan.png';
import FindWorkoutImg from '../../img/findWorkout.png';
import UsePlanImg from '../../img/usePlan.png';
import Preloader from '../../components/layout/Preloader';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser, setMessage } from '../../actions/UserActions';
import M from 'materialize-css/dist/js/materialize.min.js';
import './HomePage.css';

const HomePage = ({ logoutUser, setMessage, message, currUser }) => {
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (message) {
      M.toast({ html: message });
      setMessage(null);
    }
    //eslint-disable-next-line
  }, [message]);

  const handleLogout = (e) => {
    e.preventDefault();
    logoutUser();
  };
  if (!currUser) return <Preloader />;

  return (
    <>
      <div className='topBar'>
        <div className='siteDiv'>
          <p className='siteTitle'>
            <img className='siteIcon' src={Icon} alt='site-icon' /> &nbsp;&nbsp;
            {windowSize.width > 550 && 'WORKOUT BUILDER'}
          </p>
        </div>
        <div className='userDiv'>
          <ul>
            <li className='userAction'>
              <a href='#!' onClick={handleLogout}>
                logout
              </a>
            </li>
            {/* <li className='userAction'>
              <a href='#!'>profile</a>
            </li> */}
            {/* {windowSize.width > 550 && <li>{currUser.name}</li>} */}
            <li>{currUser.name}</li>
          </ul>
        </div>
      </div>
      <div className='container'>
        <h1 className='homeTitle'>
          <span style={{ color: 'white' }}>Hi, </span>
          {currUser.name}.
        </h1>
        <div className='row'>
          <div className='col s12 m6 l4'>
            <div className='homeActionDiv'>
              <img
                className='homeActionImg'
                src={FindWorkoutImg}
                alt='workout-img'
              />
              <br />
              <a href='/muscle-group-selection' className='homeActions'>
                Find Workouts
              </a>
              <p className='homeActionDescription'>
                Use the Workout Finder to search our workout database.
              </p>
            </div>
          </div>
          <div className='col s12 m6 l4'>
            <div className='homeActionDiv'>
              <img
                className='homeActionImg'
                src={CreatePlanImg}
                alt='computer-img'
              />
              <br />
              <a href='/plan' className='homeActions'>
                New Workout Plan
              </a>
              <p className='homeActionDescription'>
                Using our Workout Finder, put together your own workout plan,
                complete with reps, sets, and rest times.
              </p>
            </div>
          </div>
          <div className='col s12 m6 offset-m3 l4'>
            <div className='homeActionDiv'>
              <img className='homeActionImg' src={UsePlanImg} alt='plan-img' />
              <br />
              <a href='/plans' className='homeActions'>
                Use Workout Plans
              </a>
              <p className='homeActionDescription'>
                Select from your personal workout plans for a step-by-step
                exercise guide.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

HomePage.propTypes = {
  currUser: PropTypes.object,
  logoutUser: PropTypes.func.isRequired,
  setMessage: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  message: state.user.message,
  currUser: state.user.currUser,
});

export default connect(mapStateToProps, {
  logoutUser,
  setMessage,
})(HomePage);
