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
        <div
          style={{
            'marginTop': '5px',
            'marginBottom': '5px',
            'marginLeft': '8px',
            'marginRight': '8px',
            padding: '0 16px',
          }}
        >
          <Button type="primary">
            <Icon type="left" />
            <NavLink to="/categories">
              <font color="white">Back </font>
            </NavLink>
          </Button>
        </div>
        <Card
          style={{
            'margin-top': '5px',
            'margin-bottom': '5px',
            'margin-left': '8px',
            'margin-right': '8px',
            padding: '0 16px',
          }}
        >
          <Title level={3}>ADD NEW CATEGORY</Title>
        </Card>
        <Card
          style={{
            flex: '0 0 200px',
            margin: '10px',
            display: 'flex',
            'flex-direction': 'column',
            'justify-content': 'center',
          }}
        >
          <Form />
        </Card>
      </>
    );
  }
}

export default AddCategory;
