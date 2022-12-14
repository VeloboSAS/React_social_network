import React from 'react';
import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Header from './components/Header/Header';
import Navbar from './components/Navbar/Navbar';
import DialogsContainer from './components/Dialogs/DialogsContainer';
import ProfileContainer from './components/Profile/ProfileContainer';
import Count from './components/Count/Count';
import Modal from './components/Modal/Modal';
import Quiz from './components/Quiz/Quiz';
import UsersContainer  from './components/Users/UsersContainer';
import Settings from './components/Settings/Settings';
import AppImages from './components/Images/AppImages';



const App = () => {

  return (
    <BrowserRouter>
      <div className='app-wrapper'>
        <Header />
        <Navbar />
        <div className="app-wrapper-content">
            <Routes>
              <Route  path="/dialogs/*" element={ <DialogsContainer />}></Route>
              <Route  path="/profile/:userId" element={ <ProfileContainer  />}></Route>
              <Route  path='/profile/' element={<ProfileContainer />} />
              <Route  path="/users" element={<UsersContainer />}></Route>
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
  }

  export default App;



