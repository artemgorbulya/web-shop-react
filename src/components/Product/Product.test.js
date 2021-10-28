import React from "react";
import {render} from "@testing-library/react";
import { Provider } from "react-redux";
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Product from './Product';

jest.mock('../Modal/Modal', () => (props) => <div>Модальное окно</div>)

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
let testStore;
let testStoreForDeleteModal;

let props = {
    id:'00001', 
    color: "test-color",
    title: 'test-title',
    price: 'test-price',
    image: 'test-img.jpg',
    isOnCart: false,
    isFavourite: false,
    toggleFavorite: jest.fn(),
    toggleCart: jest.fn(),
    closeModal: jest.fn(),
    openModalAddCard: jest.fn(),
    openModalDeleteCard: jest.fn() 
}

beforeEach(() => {
    testStore = mockStore({
        prods: [],
        modal: 'add',
        modalid: '00001'
    })

    testStoreForDeleteModal = mockStore({
        prods: [],
        modal: 'delete',
        modalid: '00001'
    })

    props = {
        id: '00001', 
        color: "test-color",
        title: 'test-title',
        price: 'test-price',
        image: 'test-img.jpg',
        isOnCart: false,
        isFavourite: false,
        toggleFavorite: jest.fn(),
        toggleCart: jest.fn(),
        closeModal: jest.fn(),
        openModalAddCard: jest.fn(),
        openModalDeleteCard: jest.fn() 
    }
})

describe("Tests for Product component", () => {
	test('smoke product test', () => {
		const {container} = render(<Provider store={testStore}><Product/></Provider>);
		console.log(container.innerHTML);
    });
    
    test('product test with props and modal', () => {

        const {getByText, container} = render(<Provider store={testStore}><Product {...props}/></Provider>);
        expect(getByText(/00001/i)).toBeInTheDocument();
        expect(getByText(/test-color/i)).toBeInTheDocument();
        expect(getByText(/test-price/i)).toBeInTheDocument();
        expect(container.querySelector('img[src="/products/test-img.jpg"]')).toBeInTheDocument();
	});
    
    test('product test with props isOnCart - true, without modal', () => {

        const {getByText} = render(<Provider store={testStore}><Product {...props} isOnCart={true} id={'00002'}/></Provider>);
        expect(getByText('Удалить из корзины')).toBeInTheDocument();
    });
    
    test('product test with props isOnCart - false, without modal', () => {

        const {getByText} = render(<Provider store={testStore}><Product {...props} isOnCart={false} id={'00002'}/></Provider>);
        expect(getByText('Добавить в корзину')).toBeInTheDocument();
    });
    
    test('product test with props isFavourite - true, without modal', () => {

        const {container} = render(<Provider store={testStore}><Product {...props} isFavourite={true} id={'00002'}/></Provider>);
        expect(container.querySelector('.color--active')).toBeInTheDocument();
    });
    
    test('product test with props isFavourite - false, without modal', () => {

        const {container} = render(<Provider store={testStore}><Product {...props} isFavourite={false} id={'00002'}/></Provider>);
        expect(container.querySelector('.color--active')).not.toBeInTheDocument();
    });
    
    test('product test with props with modal type add', () => {

        const {container, getByText} = render(<Provider store={testStore}><Product {...props} id={'00001'}/></Provider>);
        expect(getByText('Модальное окно')).toBeInTheDocument();
    });
    
    test('product test with props with modal type delete', () => {

        const {container, getByText} = render(<Provider store={testStoreForDeleteModal}><Product {...props} id={'00001'}/></Provider>);
        expect(getByText('Модальное окно')).toBeInTheDocument();
    });
})