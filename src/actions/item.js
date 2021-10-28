// 액션 변수
const ADD_ITEM ="ADD_ITEM"
const NEW_ITEM = "NEW_ITEM"

// 새로운 아이템 임시 저장관련
const TEMP_NEW_ITEM = "TEMP_NEW_ITEM"

// 삭제 관련
const DEL_ITEM = "DEL_ITEM"

// 수정 관련
const MODI_ITEM = "MODI_ITEM"

const addItem = (data) => {
    return {
        type: ADD_ITEM,
        data,
    }
}

const newItem = (data) => {
    return {
        type: NEW_ITEM,
        data,
    }
}

const tempNewItem = (data) => {
    return {
        type: TEMP_NEW_ITEM,
        data,
    }
}

const delItem = (data) => {
    return {
        type: DEL_ITEM,
        data,
    }
}

const modiItem = (data) => {
    return {
        type: MODI_ITEM,
        data,
    }
}

module.exports = {
    addItem,
    newItem,
    tempNewItem,
    delItem,
    modiItem
}