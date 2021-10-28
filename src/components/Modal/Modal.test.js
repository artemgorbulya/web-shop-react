import React from 'react';
import {Modal} from './Modal';
import {fireEvent, render} from '@testing-library/react';

describe('Testing Modal.js', () => {

    test('Smoke test for Modal.js', () => {
      const { container } = render(<Modal/>)
      console.log(container.innerHTML);
    })

    test('Modal test with props', () => {

        const props = {
          header: 'test-header',
          text: 'test-text',
          actions: 'actions',
          closeModal: jest.fn(),
        }

        const {getByText} = render(<Modal {...props}/>);
        expect(getByText('test-header')).toBeInTheDocument();
        expect(getByText('test-text')).toBeInTheDocument();
        expect(getByText('actions')).toBeInTheDocument();

        fireEvent.click(getByText('✖'));
        expect(props.closeModal).toHaveBeenCalledTimes(1);
        
    })  



})