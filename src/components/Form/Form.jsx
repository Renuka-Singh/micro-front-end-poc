import React, { Component } from 'react';
import { Form, Input, Button, Radio, Icon, Upload } from 'ui-infra';

class AddCategoryForm extends React.Component {
  constructor() {
    super();
    this.state = {
      formLayout: 'horizontal',
    };
  }

  handleSubmit(e) {
    e.preventDefault();
    // console.log('submit CALLED');
    this.props.form.validateFields((err, values) => {
      console.log('VALIDATE CALLED');
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }

  normFile(e) {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  }

  handleFormLayoutChange = e => {
    this.setState({ formLayout: e.target.value });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { formLayout } = this.state;
    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
    };
    const buttonItemLayout = {
      wrapperCol: { span: 14, offset: 4 },
    };

    return (
      <div>
        <Form layout={formLayout} onSubmit={this.handleSubmit}>
          <Form.Item label="Name" {...formItemLayout}>
            {getFieldDecorator('username', {
              rules: [
                {
                  required: true,
                  message: 'Please input your name',
                },
              ],
            })(<Input placeholder="Please input your name" />)}
          </Form.Item>
          <Form.Item label="Keywords" {...formItemLayout}>
            <Input placeholder="enter keywords separated by comma" />
          </Form.Item>
          <Form.Item label="Description" {...formItemLayout}>
            <Input placeholder="enter description" />
          </Form.Item>
          <Form.Item label="Status Visibility" {...formItemLayout}>
            {getFieldDecorator('radio-group', {
              rules: [
                {
                  required: true,
                  message: 'Status Visibility is required',
                },
              ],
            })(
              <Radio.Group>
                <Radio value="a">Yes</Radio>
                <Radio value="b">No</Radio>
              </Radio.Group>,
            )}
          </Form.Item>
          <Form.Item label="Upload Image" {...formItemLayout}>
            {getFieldDecorator('dragger', {
              valuePropName: 'fileList',
              getValueFromEvent: this.normFile,
            })(
              <Upload.Dragger
                name="files"
                beforeUpload={() => {
                  console.log('file is uploaded');
                }}
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              >
                <p className="ant-upload-drag-icon">
                  <Icon type="inbox" />
                </p>
                <p className="ant-upload-text">
                  Click file to this area to upload
                </p>
              </Upload.Dragger>,
            )}
          </Form.Item>
          <Form.Item {...buttonItemLayout}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

const WrappedForm = Form.create()(AddCategoryForm);
export default WrappedForm;
