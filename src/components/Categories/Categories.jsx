/* eslint-disable react/no-deprecated */
/* eslint-disable react/prop-types */
/* eslint-disable max-len */
/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import { ListFilter, Button, Typography } from 'ui-infra';
import { NavLink } from 'react-router-dom';
import moment from 'moment/moment';
import queryString from 'query-string';
import Category from '../Category';

const { Title } = Typography;

class Categories extends Component {
  constructor() {
    super();
    this.state = {
      baseCategories: [],
      products: [],
      // fetchProducts: false,
    };
    console.log("saw");
  }

  componentDidMount() {
    console.log("MOUNT");
    // console.log(this.props.history);
    this.fetchCategories(this.props.location.search);
  }

  fetchCategories(searchQuery) {
    fetch(`https://bizongo.in/api/admin/base_categories${searchQuery}`, {
      method: 'GET',
      headers: {
        Authorization: 'Token token=daf72f22987c29b0a67f09b67b9f62d8',
        'Secret-Token':
          '8d982c7d594576d617b32e1a2ac79a960ed63c40352bf24a2098cdb3049ce10714bf6a6e5e79344b33f80dec440ea8d46a2c36c1284367655712d9bf8ec79133',
      },
    })
      .then(results => results.json())
      .then(data => {
        this.setState({ baseCategories: data.base_categories });
      });
  }

  componentWillReceiveProps(nextProps) {
    console.log('Next Props', nextProps);
    this.fetchCategories(nextProps.location.search);
  }

  // setFetchProducts = (item) => { this.setState({ fetchProducts: item }); }

  setProducts = productInfo => {
    this.setState({ products: productInfo });
  };

  getProducts = name => {
    console.log('Name', name);
    // this.setFetchProducts(true);
    return fetch(
      `https://bizongo.in/api/admin/base_categories?search_text=${name}`,
      {
        method: 'GET',
        headers: {
          Authorization: 'Token token=daf72f22987c29b0a67f09b67b9f62d8',
          'Secret-Token':
            '8d982c7d594576d617b32e1a2ac79a960ed63c40352bf24a2098cdb3049ce10714bf6a6e5e79344b33f80dec440ea8d46a2c36c1284367655712d9bf8ec79133',
        },
      },
    )
      .then(results => results.json())
      .then(response => {
        console.log('Response ', response);
        // this.setFetchProducts(false);
        this.setProducts(
          name
            ? response.base_categories.map(product => ({
                key: product.name,
                label: product.name,
              }))
            : [],
        );
      });
  };

  componentWillMount(){
    console.log("will cmout");
  }
  render() {
    const basicDataFixture = {
      filtersList: [
        {
          type: 'autocomplete',
          label: 'Product name',
          name: 'base_category',
          placeholder: 'Start typing',
          options: this.state.products,
          onAction: this.getProducts,
        },
        {
          type: 'dropdown',
          name: 'status',
          label: 'Status',
          defaultValue: 'Open',
          options: [
            { key: 'active', label: 'Active' },
            { key: 'inactive', label: 'Inactive' },
          ],
          placeholder: 'Status',
        },
        {
          type: 'daterange',
          name: 'date_filter',
          label: 'Date Range',
          placeholder: 'Date Range',
        },
      ],
    };

    const createSearchQuery = filters => {
      console.log('Filter passed to createSearchQuery', { ...filters });
      return queryString.stringify(
        {
          startDate:
            filters.date_filter &&
            filters.date_filter.startDate &&
            moment(filters.date_filter.startDate).format('YYYY-MM-DD'),
          endDate:
            filters.date_filter &&
            filters.date_filter.endDate &&
            moment(filters.date_filter.endDate).format('YYYY-MM-DD'),
          status: filters.status,
          search_text: filters.base_category,
        },
        {
          sort: false,
        },
      );
    };

    const getSearchQuery = () => {
      const queryParams = queryString.parse(this.props.location.search);
      if (queryParams.follow_up_start_date) {
        queryParams.date_filter = {
          startDate: queryParams.startDate,
          endDate: queryParams.endDate,
        };
      }

      console.log('Query Params from getSearchQuery are :', queryParams);
      return queryParams;
    };

    const onApplyFilters = filters => {
      console.log('Filters from onApplyFilters', filters);
      const searchQuery = createSearchQuery(filters);
      console.log('Search Query returned from createSearchQuery', searchQuery);
      // console.log("history before push",this.props.history);
      this.props.history.push({
        pathname: this.props.location.pathname,
        search: searchQuery,
      });
      // console.log("history after push",this.props.history);
    };
    console.log("Categories props", this.props);
    return (
      <>
        <div
          style={{
            'margin-top': '5px',
            'margin-bottom': '5px',
            'margin-left': '8px',
            'margin-right': '8px',
            padding: '0 16px',
          }}
        >
          <Title level={2}>
            {/* <Button type="primary"> ADD CATEGORY </Button> */}
            <Button type="primary">
              <NavLink to={`${this.props.baseRoute}/categories/new`}> ADD NEW CATEGORY </NavLink>
            </Button>
          </Title>
          {/* <ListFilter {...basicDataFixture} onAction = {() => {}}/> */}
          <ListFilter
            filtersList={basicDataFixture.filtersList}
            defaultFilters={getSearchQuery()}
            onAction={onApplyFilters}
          />
        </div>
        <div
          style={{
            display: 'flex',
            flexFlow: 'row wrap',
            justifyContent: 'flex-start',
            padding: '0 16px',
          }}
        >
          {this.state.baseCategories.map(category => (
            <Category key={category.id} category={category} />
          ))}
        </div>
      </>
    );
  }
}

export default Categories;
