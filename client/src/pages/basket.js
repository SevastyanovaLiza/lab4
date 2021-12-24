import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import { deleteDeviceFromBasket, fetchBasket } from '../http/deviceApi'
import { MAIN_ROUTE } from '../routes/consts'

const Basket = () => {


    // ------ Моковые данные для корзины ----- //

    const [devices,setDevices] = useState([])

    // ------ Сделать также подсчёт всей суммы, на которую набрал юзер в корзину ----- //

    let sum = 0;

    let count = devices.map(device => sum += Number(device.device.price))

    // ------ Узнать есть ли что-нибудь в корзине ------ //

    useEffect(() => {
        fetchBasket().then(data => {
            setDevices(data)
        })
    }, [])

    const dropDevice = (id) => {
        deleteDeviceFromBasket(id).then(data => {
            window.location.reload()
        })
    }

    return (
        <main>
            <h1 className="mt-3 d-flex justify-content-center">Корзина</h1>
            <Container className="mt-3">
                <Row>
                    <Col className="d-flex flex-wrap" sm={8}>
                        <div>
                            {devices.map(device => 
                                <div className="w-25 m-3" key={device.id}>
                                    <img src="https://via.placeholder.com/100" />
                                    <h5>{device.device.name}</h5> 
                                    <p className="d-inline-block">{device.device.price} &#8381;</p>
                                    <Button className="ml-3" onClick={() => dropDevice(device.id)}>Удалить</Button>
                                </div>
                            )}
                        </div>
                    </Col>
                    <Col sm={4}>
                        <div className="position-fixed my-3">
                            <p>Общая стоимость: {sum}&#8381;</p>
                            <Button >Оформить заказ</Button>
                        </div>
                    </Col>
                </Row>
            </Container>
        </main>
    )
}

export default Basket;