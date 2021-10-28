import axios from 'axios';

//const
const LOAD_SET_DATA = 'LOAD_SET_DATA';
const TOGGLE_FAVORITE = 'TOGGLE_FAVORITE';
const TOGGLE_CART = 'TOGGLE_CART';
const CLOSE_MODAL = 'CLOSE_MODAL';
const OPEN_MODAL_ADD_CARD = 'OPEN_MODAL_ADD_CARD';
const OPEN_MODAL_DELETE_CARD = 'OPEN_MODAL_DELETE_CARD';
const CLEAR_CART = 'CLEAR_CART';

//initial store
const initialState = {
    prods: [],
    modal: null,
    modalid: null
}

//reducer
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_SET_DATA:
            return { ...state, prods: action.payload }
        case TOGGLE_FAVORITE:
            const index = state.prods.findIndex(elem => elem.id === action.payload);
            const favArray = [...state.prods];
            favArray[index].isFavourite = !favArray[index].isFavourite;
            return { ...state, prods: favArray }
        case TOGGLE_CART:
            const indexCart = state.prods.findIndex(elem => elem.id === action.payload);
            const cartArray = [...state.prods];
            cartArray[indexCart].isOnCart = !cartArray[indexCart].isOnCart;
            return { ...state, prods: cartArray }
        case CLOSE_MODAL:
            return { ...state, modal: null, modalid: null }
        case OPEN_MODAL_ADD_CARD:
            return { ...state, modal: 'add', modalid: action.payload }
        case OPEN_MODAL_DELETE_CARD:
            return { ...state, modal: 'delete', modalid: action.payload }
        case CLEAR_CART:
                const zeroCart = state.prods.map(item =>  ({ ...item, isOnCart: false}));
                return { ...state, prods: zeroCart };
        default:
            return state;
    }
}

//actions
export const loadData = () => (dispatch) => {
    if (localStorage.getItem('products') === null) {
        axios('/products.json')
            .then(res => {
                dispatch({ type: LOAD_SET_DATA, payload: res.data })
            })
    } else {
        let localData = JSON.parse(localStorage.getItem('products'));
        dispatch({ type: LOAD_SET_DATA, payload: localData })
    }
}

export const clearLocalStorage = () => (dispatch) => {
    localStorage.removeItem('products');
    axios('/products.json')
        .then(res => {
            dispatch({ type: LOAD_SET_DATA, payload: res.data })
        })
}

export const toggleFavorite = (id) => (dispatch) => {
    dispatch({ type: TOGGLE_FAVORITE, payload: id })
}

export const toggleCart = (id) => (dispatch) => {
    dispatch({ type: TOGGLE_CART, payload: id })
}

export const closeModal = () => (dispatch) => {
    dispatch({ type: CLOSE_MODAL })
}

export const openModalAddCard = (id) => (dispatch) => {
    dispatch({ type: OPEN_MODAL_ADD_CARD, payload: id })
}

export const openModalDeleteCard = (id) => (dispatch) => {
    dispatch({ type: OPEN_MODAL_DELETE_CARD, payload: id })
}

export const clearCart = () => (dispatch) => {
    dispatch({ type: CLEAR_CART })
}

export default reducer;