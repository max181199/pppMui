import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import Statistics from './pages/statistics.js';
import Excel from './pages/excel.js'

const App = ( props ) => {
  const { currentPage } = props
  document.body.style.minWidth = '1px'
  return (
      currentPage === 'excel'
      ?
      <Excel/>
      :
      <Statistics/>
  );
};


export default connect( (store)=>({ currentPage : store.optional.page }),null)(App);
