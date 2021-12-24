import React, { useContext, useEffect } from 'react'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'

import '../../css/Modal.css'
import { observer } from 'mobx-react-lite'
import { Context } from '../..'
import { fetchTypes, getHeight, getWidth } from '../../http/deviceApi'

const Calculator = observer(({active, setActive}) => {
    const {device} = useContext(Context)

    useEffect(() => {
        fetchTypes().then(data => {
            device.setTypes(data)
        })
        getWidth().then(data => {
            device.setWidth(data)
        })
        getHeight().then(data => {
            device.setHeight(data)
        })
    }, [])

    return(
        <div className={active ? "active" : "non-active"} onClick={() => setActive(false)}>
            <div className="content" onClick={e => e.stopPropagation()} >
                <h1 className="mb-3">Калькулятор</h1>
                <Form className="calcForm">
                    <h3 className="mb-3">Расчет стоимости обоев</h3>
                    <Form.Row className="mb-3">
                        <Col>
                            <Form.Label>Вид обоев</Form.Label>
                            <Form.Control as="select">
                                {device.types.map(type => 
                                    <option key={type.id} >{type.name}</option>    
                                )}
                            </Form.Control>
                        </Col>
                        <Col>
                            <Form.Label>Толщина</Form.Label>
                            <Form.Control as="select">
                                <option>1 мм</option>
                                <option>2 мм</option>
                                <option>3 мм</option>
                                <option>4 мм</option>
                                <option>5 мм</option>
                            </Form.Control>
                        </Col>
                        <Col>
                            <Form.Label>Узор</Form.Label>
                            <Form.Control as="select">
                                <option>Однотонные</option>
                                <option>Геометрия</option>
                                <option>Цветы</option>
                            </Form.Control>
                        </Col>
                    </Form.Row>

                    <Form.Row className="mb-3">
                        <Col>
                            <Form.Label>Ширина, мм: </Form.Label>
                            <Form.Control as="select">
                                {device.width.map(size => 
                                    <option key={size.id} >{size.size}</option>
                                )}
                            </Form.Control>
                        </Col>
                        <Col>
                            <Form.Label>Длина, мм: </Form.Label>
                            <Form.Control as="select">
                                {device.height.map(size =>
                                    <option key={size.id}>{size.size}</option>    
                                )}
                            </Form.Control>
                        </Col>
                    </Form.Row>

                    <Form.Row className="mb-3">
                        <Col>
                            <Form.Label>Кол-во рулонов</Form.Label>
                            <Form.Control as="select">
                                <option>-</option>
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                                <option>6</option>
                                <option>7</option>
                                <option>8</option>
                                <option>9</option>
                                <option>10</option>
                            </Form.Control>
                        </Col>
                    </Form.Row>
                    <Button variant="primary" type="submit">Отправить</Button>
                </Form>
            </div>
        </div>
    )
})

export default Calculator