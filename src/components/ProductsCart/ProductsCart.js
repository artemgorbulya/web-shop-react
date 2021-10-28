import React from 'react';
import PropTypes from 'prop-types';
import FormCheckout from '../FormCheckout/FormCheckout';


const ProductsCart = (props) => {

	const { prods } = props;

	const countCart = prods.filter(item => item.isOnCart === true).length;
	const prodInCart = prods.filter(item => item.isOnCart === true);
	const prod = prodInCart.map(item => (<div key={item.id} className="cart-item">Артикул: {item.id} - {item.title} цена {item.price} грн </div>));
	const summPriceInCart = prods.filter(item => item.isOnCart === true).reduce((sum, item) => sum + +item.price, 0);

	return (
		<>
			<div className="products-wrapper-cart">
	<h1 className="cart-title">Товар в корзине ({countCart})</h1>	
				{prod}
				<div className="products-summ">Сумма заказа: {summPriceInCart} грн </div>
				<hr/>
				<FormCheckout summPriceInCart={summPriceInCart} prodInCart={prodInCart}/>
			</div>
			
		</>
	)

}

ProductsCart.propTypes = {
	products: PropTypes.array,
}

ProductsCart.defaultProps = {
	products: [],
}

export default ProductsCart;