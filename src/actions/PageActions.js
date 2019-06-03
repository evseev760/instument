export function basket_item(prod_id) {

  return {
    type: 'SET_BASKET',
    payload: prod_id
  }
  
}
export function basket_arr(prod_id) {

  return {
    type: 'SET_NEW_BASKET',
    payload: prod_id
  }
  
}
export function log_in(val) {

  return {
    type: 'LOG_IN',
    payload: val
  }
  
}
export function add_filtr(value) {

  return {
    type: 'ADD_FILTR',
    payload: value
  }
  
}
export function remove_filtr(value) {

  return {
    type: 'REVOVE_FILTR',
    payload: value
  }
  
}
export function change_id(value) {

  return {
    type: 'CATALOG_ID',
    payload: value
  }
  
}
export function add_sort(value) {

  return {
    type: 'ADD_SORT',
    payload: value
  }
  
}
export function add_page(value) {

  return {
    type: 'ADD_PAGE',
    payload: value
  }
  
}
export function get_categories_info(id, page, sort, filtr) {

  return {
    type: 'GET_CATEGORIES_INFO',
    id: id,
    page: page,
    sort:sort,
    filtr:filtr
  }
  
}

export function change_type_id(value) {

  return {
    type: 'TYPE_ID',
    payload: value
  }
  
}
export function data_search(value) {

  return {
    type: 'DATA_SEARCH',
    payload: value
  }
  
}