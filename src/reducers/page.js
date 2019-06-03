var initialState = {
    page: 1
}

export default function page(state = initialState, action) {

switch (action.type) {
    case 'ADD_PAGE':
    var page = action.payload
    return { ...state, page : page}

    default:
    return state;
}

}