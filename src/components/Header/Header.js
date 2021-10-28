import React from 'react';
import { withRouter, NavLink } from 'react-router-dom';
import Button from '../Button/Button';
import { connect } from 'react-redux';
import { clearLocalStorage } from '../../store/reducer';

const Header = (props) => {

    const { clearLocalStor, prods } = props;

    const goHome = () => {
        props.history.push('/');
    }

    const countCart = prods.filter(item => item.isOnCart === true).length;
    const countFavorite = prods.filter(item => item.isFavourite === true).length;

    return (
        <div className="header">
            <div className="header__wrapper">
                <div className="header__headerlogo" onClick={goHome}><i className="fas fa-mobile-alt header__logo"></i><span className="header__textlogo">MobileShop</span></div>
                <NavLink className="header__link" activeClassName="header__link--active" exact to="/">Главная страница</NavLink>
                <NavLink className="header__link" activeClassName="header__link--active" exact to="/favorites">Избранные товары ({countFavorite})</NavLink>
                <NavLink className="header__link" activeClassName="header__link--active" exact to="/cart">Корзина({countCart})</NavLink>
                <NavLink exact to="/"><Button text="Сбросить весь выбор" className="btn-card" backgroundColor="#d44637" onClick={clearLocalStor} /></NavLink>
            </div>
        </div>
    )
}


const mapStateToProps = (state) => {
    return {
        prods: state.prods,
        modal: state.modal
    }
}


const mapDispatchToProps = (dispatch) => ({
    clearLocalStor: () => dispatch(clearLocalStorage())
})



export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Header));