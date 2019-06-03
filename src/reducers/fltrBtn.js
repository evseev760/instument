

const initialState = {
    fltrBtn: ""
}  

export default function fltr_btn(state = initialState, action) {
    
    switch (action.type) {
        case 'ADD_FILTR':
            let arra = state.fltrBtn
            if (action.payload!=''){
                arra = String(arra)+'&filter[child_id][]=' + (String(action.payload))
            }else{
                arra = ''
            }
            
            return { ...state, fltrBtn: arra}

        case 'REVOVE_FILTR':
            let arr = state.fltrBtn
            
            let rem = '&filter[child_id][]='+String(action.payload)
            arr = String(arr).split(String(rem))
            arr = String(arr).replace(/\,/g,'')

            return { ...state, fltrBtn: arr}

        default:
            return state;
    }

}