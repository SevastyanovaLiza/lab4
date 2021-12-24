import { $authHost, $host } from "."

// ------- Типы ------- //

export const createType = async(name) => {
    const {data} = await $authHost.post('api/type', {name})
    return data
}

export const fetchTypes = async () => {
    const {data} = await $host.get('/api/type')
    return data
}

// ------- Типы ------- //

// ------- Размеры ------- //

export const createWidth = async (size) => {
    const {data} = await $authHost.post('api/size/width', {size})
    return data
}

export const createHeight = async (size) => {
    const {data} = await $authHost.post('/api/size/height', {size})
    return data
}

export const getWidth = async () => {
    const {data} = await $host.get('/api/size/width')
    return data
}

export const getHeight = async () => {
    const {data} = await $host.get('/api/size/height')
    return data
}

// ------- Размеры ------- //



// ------- Девайс ------- //

export const createDevice = async (name,price,width,height, typeId) => {
    const {data} = await $authHost.post('api/device', {name,price,width,height, typeId})
    return data
}   

export const fetchDevices = async (widthId, heightId, typeId) => {
    const {data} = await $host.get('/api/device', {params: {widthId, heightId,typeId}})
    return data
}

export const fetchDevice = async (id) => {
    const {data} = await $host.get('/api/device/' + id)
    return data
}

// ------- Девайс ------- //


// ------- Девайс ------- //

export const fetchBasket = async () => {
    const {data} = await $authHost.get('/api/cart')
    return data
}

export const addToBasket = async (deviceId) => {
    const {data} = await $authHost.post('/api/cart', {deviceId})
    return data
}

export const deleteDeviceFromBasket = async (id) => {
    const {data} = await $authHost.delete('/api/cart/' + id)
    return data 
}

// ------- Девайс ------- //