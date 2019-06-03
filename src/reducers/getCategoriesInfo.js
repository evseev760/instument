import $ from 'jquery';
window.jQuery = window.$ = $;

var initialState = {
    getCategoriesInfo:[]
}

export default function get_categories_info(state = initialState, action) {

switch (action.type) {
    case 'GET_CATEGORIES_INFO':
    var showData = [];
    
    var url = 'http://instrument.kosatka.org/api/products/get-products-in-category?parent_id=' + String(action.id) + String('&page='+ action.page) + String(action.sort) + String(action.filtr)
    
    $.getJSON(url , function (result) {
        showData.push(result);
    }.bind(this));
    
    return { ...state, getCategoriesInfo : showData}

    default:
    return state;
}

}
