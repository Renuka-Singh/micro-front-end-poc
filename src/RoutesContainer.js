/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Result } from 'ui-infra';
import Categories from './components/Categories';
import AddCategory from './components/AddCategory';
// import DispatchPlans from './components/DispatchPlans';
// import Stocks from './components/Stocks';

console.log('react-router', Switch);

const RoutesContainer = (props) => {
  console.log({props});
  return (
    // eslint-disable-next-line react/jsx-filename-extension
    <Switch>
    <Route
      exact
      path={`${props.baseRoute}/categories`}
      component={(selfProps) => <Categories {...selfProps} baseRoute={props.baseRoute} />} />
      <Route
        path={`${props.baseRoute}/categories/new`}
        component={AddCategory} />
    <Redirect exact from="/" to={`${props.baseRoute}/categories`} />
    </Switch>
  );
};

export default RoutesContainer;
