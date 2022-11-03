import React from 'react';
import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Header from './components/Header/Header';
import Navbar from './components/Navbar/Navbar';
import Profile from './components/Profile/Profile';
import Dialogs from './components/Dialogs/Dialogs';
import Count from './components/Count/Count';
import Modal from './components/Modal/Modal';
import Quiz from './components/Quiz/Quiz';
import Settings from './components/Settings/Settings';

const App = (props) => {

  return (
    <BrowserRouter>
      <div className='app-wrapper'>
        <Header />
        <Navbar />
        <div className="app-wrapper-content">
            <Routes>
              <Route  path="/dialogs/*" element={ <Dialogs  
                                                            state={props.state.dialogsPages}
                                                            store={props.store}
                                                            dispatch={props.dispatch} />}></Route>
              <Route  path="/profile" element={ <Profile profilePages={props.state.profilePages}
                                                          dispatch={props.dispatch}/>}></Route>
              <Route  path="/count" element={<Count />}></Route>
              <Route  path="/modal" element={<Modal />}></Route>
              <Route  path="/quiz" element={<Quiz />}></Route>
              <Route  path="/settings" element={<Settings />}></Route>
            </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
  }

  export default App;



