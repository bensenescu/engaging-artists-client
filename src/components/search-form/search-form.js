import React, { useState } from "react"
import { Form, Input } from 'antd';

// const SearchForm = () => {
//   const [min_followers, set_min_followers] = useState(0);
//   const [min_followers, set_min_followers] = useState(0);
//   const [min_followers, set_min_followers] = useState(0);


// }

class SearchForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      search_params: {
        min_followers: 0,
        max_followers: Number.MAX_SAFE_INTEGER,
        min_engagement_rate: 0
      },
    }
  }

  render() {
    return (
      <Form>
        <Form.Item label="Minimum Followers:">
          <Input placeholder="input placeholder" />
        </Form.Item>
        <Form.Item label="Maximum Followers:">
          <Input placeholder="input placeholder" />
        </Form.Item>
        <Form.Item label="Engagement Rate:">
          <Input placeholder="input placeholder" />
        </Form.Item>
      </Form>
    )
  }
}

export default SearchForm;