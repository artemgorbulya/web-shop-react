import React from 'react';
import Button from './Button';
import {fireEvent , render} from '@testing-library/react';

const props = {
    text: "test-text",
    className: 'test-classname',
    backgroundColor: '#dddddd',
    onClick: jest.fn(),
    closeIcon: false
}


describe('Testing Button.js', () => {
    test('Smoke test for Email.js', () => {
      const { container } = render(<Button/>);
      console.log(container.innerHTML);
    })

    test('Button test components  ', () => {
        const { container } = render(<Button {...props} />);
        console.log(container.innerHTML);
    })

    test('Button test components call closeIcon true ', () => {
        const {getByText } = render(<Button closeIcon={true} />);
        expect(getByText('✖')).toBeInTheDocument();
        
    })

    test('Button test components props closeIcon false ', () => {
        const { container } = render(<Button {...props} />);
        fireEvent.click(container.firstChild);
		expect(props.onClick).toHaveBeenCalledTimes(1);
    })

})

