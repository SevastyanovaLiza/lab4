import { observer } from 'mobx-react-lite';
import { useContext, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button'
import { Context } from '..';
import AddDevice from '../components/modal/admin/addDevice'
import AddType from '../components/modal/admin/addType';
import { fetchTypes } from '../http/deviceApi';

const Admin = observer(() => {
  const {device} = useContext(Context)

  useEffect(() => {
    fetchTypes().then(data => {
      device.setTypes(data)
    })
  }, [])

  const [activeDevice, setActiveDevice] = useState(false)
  const [activeType, setActiveType] = useState(false)

  return (
      <div>
        <h1 className="mt-3 d-flex justify-content-center">Панель Админа</h1>
        <div className="d-flex justify-content-center my-3">
          <Button className="mx-3" onClick={() => setActiveDevice(true)} >Добавить товар</Button>
          <Button className="mx-3" onClick={() => setActiveType(true)} >Добавить тип</Button>
        </div>

        <AddDevice active={activeDevice} setActive={setActiveDevice} />
        <AddType active={activeType} setActive={setActiveType} />
      </div>
  );
})

export default Admin;