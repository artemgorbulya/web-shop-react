import React from 'react'
import {Route, Switch } from 'react-router-dom';
import ProductsWrapper from '../components/ProductsWrapper/ProductsWrapper';
import ProductsCart from '../components/ProductsCart/ProductsCart';
import ProductsFavorites from '../components/ProductsFavorites/ProductsFavorites';
import Page404 from '../components/Page404/Page404';

const AppRoutes = (props)=> {
      
    const {prods} = props;

    return (
      <Switch>
        <Route  exact path='/' render={() => <ProductsWrapper prods={prods} />} />
        <Route  exact path='/favorites' render={() => <ProductsFavorites prods={prods} />}/>
        <Route  exact path='/cart' render={() => <ProductsCart prods={prods} />}  />
        <Route path='*' component={Page404} />
      </Switch>
    )
}

export default AppRoutes;