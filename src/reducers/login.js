import $ from 'jquery';
window.jQuery = window.$ = $;


var initialState = {

        login:false

}

export default function log_in(state = initialState, action) {

    switch (action.type) {
        case 'LOG_IN':
        return { ...state, login: action.payload}

        default:
        return state;
    }

}