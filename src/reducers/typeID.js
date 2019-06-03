
var initialState = {
    typeID:''
}

export default function catalog_ID(state = initialState, action) {

switch (action.type) {
    case 'TYPE_ID':
    return { ...state, typeID : action.payload}

    default:
    return state;
}

}