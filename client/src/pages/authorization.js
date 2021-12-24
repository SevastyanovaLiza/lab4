import React, { useContext, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { LOGIN_ROUTE, MAIN_ROUTE, REGISTRATION_ROUTE } from '../routes/consts'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { login, registration } from '../http/userApi'
import { observer } from 'mobx-react-lite'
import { Context } from '..'

const Authorizaton = observer(() => {
    const {user} = useContext(Context)

    const history = useHistory()

    const location = useLocation()
    const isLogin = location.pathname === LOGIN_ROUTE

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const auth = async () => {
        try {
            let data;
            if (isLogin) {
                data = await login(email, password);
            } else {
                data = await registration(email, password);
            }
            user.setUser(user)
            user.setIsAuth(true)
            history.push(MAIN_ROUTE)
        } catch (e) {
            alert(e.response.data.message)
        }
    }

    return (
        <main>
            <h1 className="mt-3 d-flex justify-content-center">{isLogin ? "Авторизация" : "Регистрация"}</h1>
            <div className="my-3 w-25 d-flex flex-column mx-auto">
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Пароль</Form.Label>
                    <Form.Control type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Пароль" />
                </Form.Group>
                <Button variant="primary" type="submit" onClick={auth} >{isLogin ? "Войти" : "Зарегистрироваться"}</Button>
                {!isLogin ? <span>Есть аккаунт? <a href={LOGIN_ROUTE}>Авторизуйтесь</a></span>  : <span>Нет аккаунта? <a href={REGISTRATION_ROUTE}>Зарегистрируйтесь</a></span>}
            </div>
        </main>
    )
})

export default Authorizaton
