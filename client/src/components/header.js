import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/Formcontrol'
import Button from 'react-bootstrap/Button'
import { useHistory } from 'react-router'
import { ADMIN_ROUTE, BASKET_ROUTE, LOGIN_ROUTE, MAIN_ROUTE } from '../routes/consts'
import { observer } from 'mobx-react-lite'
import { useContext, useState } from 'react'
import { Context } from '..'
import jwtDecode from 'jwt-decode'

import Calculator from './modal/calculator'


const Header = observer(() => {
  const {user} = useContext(Context)

  const [calc, setCalc] = useState(false)

  if(localStorage.getItem('token')){
    const decoded = jwtDecode(localStorage.getItem('token'))
    if(!decoded){
      user.setIsAuth(false)
    }
  } else {
    user.setIsAuth(false)
  }
  
  const history = useHistory()

  const logOut = () => {
    user.setUser({})
    user.setIsAuth(false)
    localStorage.removeItem('token')
    history.push(LOGIN_ROUTE)
}

  return (
    <header>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href={MAIN_ROUTE}>Дом обоев</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link onClick={() => setCalc(true)}>Калькулятор</Nav.Link>
          {user.isAuth ? <Nav.Link onClick={() => history.push(BASKET_ROUTE)}>Корзина</Nav.Link> : <></>}
        </Nav>
        <Form inline>
          {!user.isAuth ? 
          <Button variant="outline-primary" onClick={() => history.push(LOGIN_ROUTE)}>Авторизация</Button>
          :
          <Button variant="outline-light" onClick={logOut}>Выйти из аккаунта</Button>
          }
        </Form>
        {user.isAuth ? <Button className="ml-3" variant="light" onClick={() => history.push(ADMIN_ROUTE)}>Панель Админа</Button> : <></>}
        <Calculator  active={calc} setActive={setCalc} />
      </Navbar>
     
    </header>
  );
})

export default Header;