import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { useHistory, useParams } from 'react-router-dom'
import { addToBasket, fetchDevice } from '../http/deviceApi'
import { BASKET_ROUTE, MAIN_ROUTE } from '../routes/consts'

const DevicePage = () => {
    const [device, setDevice] = useState({})
    const [width, setWidth] = useState({})
    const [height, setHeight] = useState({})
    const [open, setOpen] = useState(false)

    const history = useHistory()

    const {id} = useParams()

    useEffect(() => {
        fetchDevice(id).then(data => {
            setDevice(data)
            setWidth(data.width)
            setHeight(data.height)
        })
    }, [id])

    let err = false;
    if(device === null){
        err = true
        history.push(MAIN_ROUTE)
    }

    const addToCart = async (id) => {
        addToBasket(id).then(data => {
            setOpen(true)
        })
    }

    return (
        <>
            {!err 
                ? 
                <div>
                    <img className="my-3 d-flex mx-auto" src="https://via.placeholder.com/500x400" />
                    <Container className="my-3">
                        <Row>
                            <Col sm={8}>
                                <h1>{device.name}</h1>
                                <h1><p>Описание</p></h1>
                                <div className="my-3">
                                    <h5>Обои</h5>
                                    <span>Размер обоев: {width.size/100}X{height.size} м </span><br />
                                </div>
                                <h5>{device.price}&#8381;</h5>
                            </Col>
                            <Col sm={4} className="d-flex flex-column align-items-center">
                                <Button onClick={() => addToCart(device.id)} >Добавить в корзину</Button>
                                <Button className={!open ? "d-none" : "d-flex"} onClick={() => history.push(BASKET_ROUTE)} >Перейти в корзину</Button>
                            </Col>
                        </Row>
                    </Container>
                </div> 
                :
                <></>
            }
        </>
    )
}

export default DevicePage;