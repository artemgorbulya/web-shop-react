import React from 'react';
import PropTypes from 'prop-types';
import Product from '../Product/Product';


const ProductsCart = (props) => {

	const { prods } = props;

	const countFav = prods.filter(item => item.isFavourite === true).length;

	const prod = prods.filter(item => item.isFavourite === true)
					  .map(item => (<Product key={item.id} {...item} />));

	if (countFav === 0) {
		return (
			<>
				<div className="products-wrapper">
					<div className="no-items">
						<div className="no-items__wrapper">
							Нет товаров для отображения
               				 </div>
					</div>
				</div>
			</>
		)
	} else {
		return (
			<>
				<div className="products-wrapper">
					{prod}
				</div>
			</>
		)
	}

}

ProductsCart.propTypes = {
	products: PropTypes.array,
}

ProductsCart.defaultProps = {
	products: [],
}

export default ProductsCart;