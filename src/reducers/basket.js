function get_cookie ( cookie_name )
{
  var results = document.cookie.match ( '(^|;) ?' + cookie_name + '=([^;]*)(;|$)' );
 
  if ( results )
    return ( unescape ( results[2] ) );
  else
    return null;
}
var initialState = {
    basket: get_cookie('basket')?get_cookie('basket').split(','):[]
}

export default function basket(state = initialState, action) {

    switch (action.type) {
        case 'SET_BASKET':
        let arr = state.basket
        arr.push(action.payload)
        return { ...state, basket: arr}

        case 'SET_NEW_BASKET':
        return { ...state, basket: action.payload}

        default:
        return state;
    }

}