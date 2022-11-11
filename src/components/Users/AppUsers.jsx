import React, { useState, useEffect} from 'react';
// import './index.scss';
import { Success } from './Components/Success';
import { Users } from './Components/AppUsers/';

// Тут список пользователей: https://reqres.in/api/users

const AppUsers = () =>  {
  const [users, setUsers] = useState([])

  useEffect(() => {
    fetch('https://reqres.in/api/users').then(res => res.json())
                                        .then((json) => {
                                          setUsers(json.data)
                                        })
                                        .catch((err) => {
                                          console.warn(err);
                                          alert('Ошибка при получении пользователей')
                                        })
  }, []);

  return (
    <div className="App">
      <Users />
      {/* <Success /> */}
    </div>
  );
}

export default AppUsers;