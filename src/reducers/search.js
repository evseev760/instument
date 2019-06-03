
import $ from 'jquery';
window.jQuery = window.$ = $;

var initialState = {
    search: []
}

export default function search_info(state = initialState, action) {

switch (action.type) {
    case 'DATA_SEARCH':
    // var showData = [];
    // if(action.payload != ''){
    //     var url = 'http://instrument.kosatka.org/api/search/?query=' + String(action.payload)
    //     $.getJSON(url , function (result) {
    //         showData.push(result);
    //     }.bind(this));
    // }else{
    //     showData = [];
    // }
    //console.log(showData[0])
    
    return { ...state, search : action.payload}
    
    

    default:
    return state;
}

}