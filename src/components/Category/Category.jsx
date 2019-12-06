/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { Card, Typography } from 'ui-infra';
// import { NavLink } from 'react-router-dom';
import moment from 'moment/moment';

const { Text } = Typography;

class Category extends Component {
  render() {
    console.log("Category");
    return (
      // <NavLink to="/categories/new">
      <Card
        style={{
          flex: '0 0 200px',
          margin: '10px',
          display: 'flex',
          'flex-direction': 'column',
          'justify-content': 'center',
        }}
      >
        <div
          style={{
            'max-width': '100%',
            'text-align': 'center',
          }}
        >
          <img src={this.props.category.image_url} alt=" " />
        </div>
        <Text strong style={{ fontSize: 16 }}>
          {this.props.category.name}
        </Text>
        <div>{this.getStatus()}</div>
        <Text strong>
          Updated On : {moment(this.props.category.updated_at).format('LL')}
        </Text>
      </Card>
      // </NavLink>
    );
  }

  getStatus() {
    const { visibility } = this.props.category;
    return (
      <>
        <Text strong>Status:</Text>
        <Text strong style={{ color: visibility ? 'green' : 'red' }}>
          {visibility ? 'Active' : 'Inactive'}
        </Text>
      </>
    );
  }
}

export default Category;
