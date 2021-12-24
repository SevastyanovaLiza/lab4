import {makeAutoObservable} from 'mobx'

export default class UserStore {
    constructor() {
        this._types = []
        this._type = {}
        this._width = []
        this._selectedWidth = {}
        this._height = []
        this._selectedHeight = {}
        this._devices = []
        makeAutoObservable(this)
    }

    setTypes(types) {
        this._types = types
    }
    setType(type){
        this._type = type
    }

    setWidth(sizes){
        this._width = sizes
    }
    setSelectedWidth(width){
        this._selectedWidth = width
    }

    setHeight(sizes){
        this._height = sizes
    }
    setSelectedHeight(height){
        this._selectedHeight = height
    }

    setDevices(devices){
        this._devices = devices
    }

    get types(){
        return this._types
    }
    get type(){
        return this._type
    }

    get width(){
        return this._width
    }
    get selectedWidth(){
        return this._selectedWidth
    }

    get height(){
        return this._height
    }
    get selectedHeight(){
        return this._selectedHeight
    }

    get devices(){
        return this._devices
    }
}
