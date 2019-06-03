var initialState = {
    sort:'&order[asc]=price'
}

export default function sort(state = initialState, action) {

switch (action.type) {
    case 'ADD_SORT':
    return { ...state, sort : action.payload}

    default:
    return state;
}

}