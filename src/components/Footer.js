import React from 'react';
import { Segment, Container, Grid, Header, List, Icon } from 'semantic-ui-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Segment inverted vertical style={{ padding: '5em 0em' }}>
      <Container>
        <Grid divided inverted stackable>
          <Grid.Row>
            {/* About Section */}
            <Grid.Column width={3}>
              <Header inverted as='h4' content='About' />
              <List link inverted>
                <List.Item as='a'>Contact Us</List.Item>
                <List.Item as='a'>About Us</List.Item>
                <List.Item as='a'>Careers</List.Item>
              </List>
            </Grid.Column>

            {/* Services Section */}
            <Grid.Column width={3}>
              <Header inverted as='h4' content='Explore' />
              <List link inverted>
                <List.Item as='a'>FAQ</List.Item>
                <List.Item as='a'>Tutorials</List.Item>
                <List.Item as='a'>Articles</List.Item>
              </List>
            </Grid.Column>

            {/* DEV@Deakin Section */}
            <Grid.Column width={7}>
              <Header as='h4' inverted>
                DEV@Deakin
              </Header>
              <p>
                Hello, we are a community of developers who love to learn and share knowledge.
              </p>
              {/* Social Media Links */}
              <List horizontal inverted>
                <List.Item as='a' href='#'><Icon name='facebook' /></List.Item>
                <List.Item as='a' href='#'><Icon name='twitter' /></List.Item>
                <List.Item as='a' href='#'><Icon name='linkedin' /></List.Item>
              </List>
            </Grid.Column>
          </Grid.Row>
        </Grid>

        {/* Copyright Notice */}
        <div style={{ marginTop: '2em', textAlign: 'center' }}>
          <p>&copy; {currentYear} DEV@Deakin. All rights reserved.</p>
        </div>
      </Container>
    </Segment>
  );
};

export default Footer;