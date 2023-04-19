import React, {Component} from 'react';
import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import HeaderContainer from './components/Header/HeaderContainer';
import Navbar from './components/Navbar/Navbar';
import DialogsContainer from './components/Dialogs/DialogsContainer';
import ProfileContainer from './components/Profile/ProfileContainer';
import Count from './components/Count/Count';
import Modal from './components/Modal/Modal';
import Quiz from './components/Quiz/Quiz';
import UsersContainer  from './components/Users/UsersContainer';
import Settings from './components/Settings/Settings';
import AppImages from './components/Images/AppImages';
import Login from './components/Login/Login';
import {connect} from 'react-redux';
import { initializeApp } from './Redux/appReducer';
import Preloader from './components/Preloader/Preloader';

class App extends Component {
  componentDidMount() {
    this.props.initializeApp()
}
  render() {
    if (!this.props.initialized) {
      return <Preloader/>
    }
    return (
      <BrowserRouter>
        <div className='app-wrapper'>
          <HeaderContainer />
          <Navbar />
          <div className="app-wrapper-content">
              <Routes>
                <Route  path="/dialogs/*" element={ <DialogsContainer />}></Route>
                <Route  path="/profile/:userId" element={ <ProfileContainer  />}></Route>
                <Route  path='/profile/' element={<ProfileContainer />} />
                <Route  path="/users" element={<UsersContainer />}></Route>
                <Route  path="/login" element={<Login />}></Route>
                <Route  path="/count" element={<Count />}></Route>
                <Route  path="/modal" element={<Modal />}></Route>
                <Route  path="/quiz" element={<Quiz />}></Route>
                <Route  path="/settings" element={<Settings />}></Route>
                <Route  path="/images" element={<AppImages />}></Route>
              </Routes>
          </div>
        </div>
      </BrowserRouter>
  );
  };
}

const mapStateToProps = (state) => ({
  initialized: state.app.initialized
})

export default connect(mapStateToProps, {initializeApp})(App);  