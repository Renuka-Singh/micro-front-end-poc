import React from 'react';
import { Router } from 'react-router-dom';
import { SecondaryHeader } from 'ui-infra';
import { createBrowserHistory } from 'history';
import RoutesContainer from './RoutesContainer';

const standAloneAppHistory = createBrowserHistory();

// eslint-disable-next-line quotes
console.log('History', standAloneAppHistory);

// eslint-disable-next-line no-lone-blocks

const secondaryHeaderData = (history, baseRoute) => ({
  lowerHead: {
    tabs: {
      onSelection: (event) => {
        history.push(event.key);
      },
      options: [
        {
          key: `${baseRoute}/categories`,
          value: 'Base Categories',
        },
      ],
    },
  },
});

const getSecondaryHeader = (history, baseRoute) => {
  const template = (
    <SecondaryHeader data={secondaryHeaderData(history, baseRoute)} />
  );
  console.log('Template', template);
  return template;
};

const getApp = (history = standAloneAppHistory, baseRoute = '') => {
  console.log('GET APP');
  // console.log("History",history);
  // console.log("Base Route",baseRoute);
  console.log({ standAloneAppHistory });
  return (
    <Router history={history} basename={baseRoute}>
      {getSecondaryHeader(history, baseRoute)}
      <div style={{ padding: '1rem 2.5rem' }}>
        <RoutesContainer baseRoute={baseRoute} />
      </div>
    </Router>
  );
};

export default getApp;
