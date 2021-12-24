import React, { useState } from 'react'

import '../../../css/Modal.css'
import { createHeight, createType, createWidth} from '../../../http/deviceApi'

const AddType = ({active, setActive}) => {
    const [name, setName] = useState('')
    const [width, setWidth] = useState('')
    const [height, setHeight] = useState('')

    const addType = () => {
        try{
            createType(name).then(data => {
                setActive(false)
            })
        } catch (e) {
            alert(e)
        }
    }

    const addWidth = () => {
        try{
            createWidth(width).then(data => {
                alert(`Создали ${width}`)
                setWidth({})
            })
        } catch (e){
            alert(e)
        }
    }

    const addHeight = () => {
        try{
            createHeight(height).then(data => {
                alert(`Создали ${height}`)
                setHeight({})
            })
        } catch (e){
            alert(e)
        }
    }

    return(
        <div className={active ? "active" : "non-active"} onClick={() => setActive(false)} >
            <div className="content" onClick={e => e.stopPropagation()}>
                <h1>Создать тип</h1>
                <input  type="text" value={name} onChange={e => setName(e.target.value)}  placeholder="Напишите тип здесь" />
                <button  class="mt-3 btn btn-primary" onClick={addType}>Создать</button>
                <hr />

                <h1>Создать ширину</h1>
                <input  type="text" value={width} onChange={e => setWidth(e.target.value)}  placeholder="Напишите ширину здесь" />
                <button  class="mt-3 btn btn-primary" onClick={addWidth}>Создать</button>
                <hr />

                <h1>Создать длину</h1>
                <input  type="text" value={height} onChange={e => setHeight(e.target.value)}  placeholder="Напишите длину здесь" />
                <button  class="mt-3 btn btn-primary" onClick={addHeight}>Создать</button>
                <hr />
            </div>
        </div>
    )
}

export default AddType