const initialState = {
    moreMenuIsOpen: false,      //更多選項是否顯示
    renderingPage: "AerialView",    //目前顯示的Component
}

// 這個Reducer是空的，之所以創建是為了避免在最初創建store時沒有reducer而出錯
export default function myFirstReducers(state = initialState, action) {
    switch (action.type) {
        case 'CLOSEMOREMENU':
            return {
                ...state,
                moreMenuIsOpen: false,
            };
        case 'OPENMOREMENU':
            return {
                ...state,
                moreMenuIsOpen: true,
            };
        case 'UPDATERENDERINGPAGE':
            return {
                ...state,
                renderingPage: action.value,
            }
        default:
            return state
    }
}