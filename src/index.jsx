/* eslint-disable no-unused-vars */
import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import getApp from './App.jsx';

const DEV_MODE = false;

console.log('Awesome', Link);
// basRoute - "/app/catalouge"
// current child app routes
// /categories
// /categories/new

export const initCataloguing = (history, baseRoute) => {
  console.log('CATALOGUING INITIALIZED');
  const appToRender = getApp(history, baseRoute);
  console.log(appToRender);
  return appToRender;
};

if (DEV_MODE) {
  console.log("DEV");
  ReactDOM.render(getApp(), document.getElementById('app'));
}
