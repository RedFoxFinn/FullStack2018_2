import axios from 'axios';

const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const createItem = (newObject) => {
    const request = axios.post(baseUrl, newObject)
    return request.then(response => response.data)
}

const deleteItem = (itemToDelete) => {
    const request = axios.delete(baseUrl + '/' + itemToDelete)
    return request.then(response => response.data)
}

const replaceItem = (idToReplace, replacementItem) => {
    const request = axios.put(baseUrl + '/' + idToReplace, replacementItem)
    return request.then(response => response.data)
}

export default {getAll, createItem, deleteItem, replaceItem}