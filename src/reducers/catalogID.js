
var initialState = {
    catalogID:''
}

export default function catalog_ID(state = initialState, action) {

    switch (action.type) {
        case 'CATALOG_ID':
        return { ...state, catalogID : action.payload}

        default:
        return state;
    }

}