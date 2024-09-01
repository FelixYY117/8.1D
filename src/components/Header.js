import React from 'react';
import { Menu, Container, Input } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <Menu inverted>
      <Container style={{ backgroundColor: '#333' }}>
        <Menu.Item header as={Link} to="/">DEV@Deakin</Menu.Item>
        <Menu.Item as={Link} to="/questions">Find Questions</Menu.Item>
        <Menu.Menu position='right'>
          <Input icon='search' placeholder='Search...' width={16} />
          <Menu.Item as={Link} to="/post">Post</Menu.Item>
          <Menu.Item as={Link} to="/login">Login</Menu.Item>
        </Menu.Menu>
      </Container>
    </Menu>
  );
};

export default Header;