import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Header from '../src/components/Header/Header';
import AppRoutes from '../src/routes/AppRoutes';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { loadData } from './store/reducer';

import './App.scss';

const App = (props) => {

  const { loadData, prods } = props;

  useEffect(() => {

    loadData();

  }, [loadData]);

  useEffect(() => {

    const product = JSON.stringify(prods);
    localStorage.setItem('products', product);

  }, [prods]);


  return (
    <>
      <Header/>
      <AppRoutes prods={prods}  />
    </>
  );

}

App.propTypes = {
  products: PropTypes.array,
}

App.defaultProps = {
  products: [],
}

const mapStateToProps = (state) => {
  return {
    prods: state.prods,
  }
}

const mapDispatchToProps = (dispatch) => ({
  loadData: () => dispatch(loadData())
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App));
