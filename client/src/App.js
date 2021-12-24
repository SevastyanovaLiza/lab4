import React, { useContext, useEffect } from 'react'
import {BrowserRouter} from 'react-router-dom'

import Header from './components/header';
import AppRouter from './components/AppRouter'
import { observer } from 'mobx-react-lite';
import { check } from './http/userApi';
import { Context } from '.';

const App = observer(() => {
  const {user} = useContext(Context)

  useEffect(() => {
    check().then(data => {
      user.setUser(true)
      user.setIsAuth(true)
    })
  }, [])

  return (
    <BrowserRouter>
      <Header />
      <AppRouter />
    </BrowserRouter>
  );
})

export default App;