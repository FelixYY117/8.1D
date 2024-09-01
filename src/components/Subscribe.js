// src/components/Subscribe.js
import React from 'react';
import { Form, Button } from 'semantic-ui-react';

const Subscribe = () => (
  <div className="subscribe-container">
    <h3>SIGN UP FOR OUR DAILY INSIDER</h3>
    <Form>
      <Form.Field inline>
        <input type="email" placeholder="Enter your email" />
        <Button type="submit">Subscribe</Button>
      </Form.Field>
    </Form>
  </div>
);

export default Subscribe;
