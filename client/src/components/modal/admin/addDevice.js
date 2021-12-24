import React, { useContext, useState } from 'react'

import { observer } from 'mobx-react-lite'

import { Dropdown } from 'react-bootstrap'
import '../../../css/Modal.css'

import {Context} from '../../../index'
import { createDevice } from '../../../http/deviceApi'

const AddDevice = observer(({active, setActive}) => {
    const {device} = useContext(Context)

    const [name, setName] = useState('')
    const [price, setPrice] = useState('')

    const addDevice = () => {
        try{
            createDevice(name,price,device.selectedWidth.size,device.selectedHeight.size,device.type.id).then(data => setActive(false))
        } catch(e){
            alert(e)
        }
    }

    return (
        <div className={active ? "active" : "non-active"} onClick={() => setActive(false)} >
            <div className="content" onClick={e => e.stopPropagation()} >
                <h1>Добавить товар</h1>
                
                <input type="text" value={name}     onChange={e => setName(e.target.value)}     placeholder="Название товара"  />
                <input type="text" value={price}    onChange={e => setPrice(e.target.value)}    placeholder="Цена товара"  />
                <Dropdown className="mt-2 mb-2">
                    <Dropdown.Toggle>Выберите ширину обоев</Dropdown.Toggle>
                    <Dropdown.Menu>
                        {device.width.map(type => 
                            <Dropdown.Item
                            key={type.id}
                            onClick={() => device.setSelectedWidth(type)}
                            >
                                {type.size}
                            </Dropdown.Item>                                
                        )}
                    </Dropdown.Menu>
                </Dropdown>
                <Dropdown className="mt-2 mb-2">
                    <Dropdown.Toggle>Выберите длину обоев</Dropdown.Toggle>
                    <Dropdown.Menu>
                        {device.height.map(type => 
                            <Dropdown.Item
                            key={type.id}
                            onClick={() => device.setSelectedHeight(type)}
                            >
                                {type.size}
                            </Dropdown.Item>                                
                        )}
                    </Dropdown.Menu>
                </Dropdown>

                <Dropdown className="mt-2 mb-2">
                    <Dropdown.Toggle>Выберите тип обоев</Dropdown.Toggle>
                    <Dropdown.Menu>
                        {device.types.map(type => 
                            <Dropdown.Item
                            key={type.id}
                            onClick={() => device.setType(type)}
                            >
                                {type.name}
                            </Dropdown.Item>                                
                        )}
                    </Dropdown.Menu>
                </Dropdown>

                <button onClick={addDevice}>Добавить</button>

            </div>
        </div>
    )
})

export default AddDevice