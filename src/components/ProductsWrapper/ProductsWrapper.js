import React from 'react';
import PropTypes from 'prop-types';
import Product from '../Product/Product';


const ProductsWrapper = (props) => {

	const { prods} = props;

	const prod = prods.map(item => (<Product key={item.id} {...item} />));

	return (
		<>
			<div className="products-wrapper">
				{prod}
			</div>
		</>
	)

}

ProductsWrapper.propTypes = {
	products: PropTypes.array,
}

ProductsWrapper.defaultProps = {
	products: [],
}

export default ProductsWrapper;