import React from "react"
import { Form, Input, Button } from 'antd';

class SearchForm extends React.Component{
  constructor(props) {
    super(props);

    this.state = {
      min_followers: 0,
      max_followers: Number.MAX_SAFE_INTEGER,
      min_engagement_rate: 0
    };
    
    this.handleInputChange = this.handleInputChange.bind(this)
  }

  handleInputChange({ target }) {
    const { value, name } = target

    this.setState({
      [name]: parseFloat(value),
    });
  }

  render() {
    return (
      <Form>
        <Form.Item label="Minimum Followers:">
          <Input 
            name="min_followers" 
            type="number"
            onChange={this.handleInputChange}
            />
        </Form.Item>
        <Form.Item label="Maximum Followers:">
          <Input 
            name="max_followers" 
            type="number"
            onChange={this.handleInputChange}
            />
        </Form.Item>
        <Form.Item label="Engagement Rate:">
          <Input 
            name="min_engagement_rate"
            type="number"
            min="1"
            max="100"
            onChange={this.handleInputChange}
            />
        </Form.Item>
        <Form.Item>
          <Button type="primary" onClick={() => this.props.handleClick(this.state)}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    )
  }
}

export default SearchForm;