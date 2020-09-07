import React, { useState } from "react"
import { Form, Input, Button } from 'antd';

function SearchForm(props) {
  const [minFollowers, setMinFollowers] = useState(0);
  const [maxFollowers, setMaxFollowers] = useState(0);
  const [minEngagementRate, setMinEngagementRate] = useState(0);

  return (
    <Form>
      <Form.Item label="Minimum Followers:">
        <Input
          type="number"
          onChange={({ target }) => setMinFollowers(parseFloat(target.value))}
        />
      </Form.Item>
      <Form.Item label="Maximum Followers:">
        <Input
          type="number"
          onChange={({ target }) => setMaxFollowers(parseFloat(target.value))}
        />
      </Form.Item>
      <Form.Item label="Engagement Rate:">
        <Input
          type="number"
          min="1"
          max="100"
          onChange={({ target }) => setMinEngagementRate(parseFloat(target.value))}
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary" onClick={() => props.handleClick({ minFollowers, maxFollowers, minEngagementRate })}>
          Submit
          </Button>
      </Form.Item>
    </Form>
  )
}

export default SearchForm;