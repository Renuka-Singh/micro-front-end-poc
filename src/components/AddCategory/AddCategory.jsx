import React, { Component } from 'react';
import { Card, Button, Icon, Typography } from 'ui-infra';
import { NavLink } from 'react-router-dom';
import Form from '../Form';

const { Title } = Typography;

class AddCategory extends Component {
  // state = { }

  render() {
    return (
      <>
        <div>
          <Button type="primary">
            <Icon type="left" />
            <NavLink to={`${this.props.baseRoute}/categories`}>
              <font color="white">Back </font>
            </NavLink>
          </Button>
        </div>
        <Card>
          <Title level={3}>ADD NEW CATEGORY</Title>
        </Card>
        <Card>
          <Form />
        </Card>
      </>
    );
  }
}

export default AddCategory;
