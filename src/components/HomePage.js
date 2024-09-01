import React from 'react';
import { Container, Header } from 'semantic-ui-react';
//import FeatureArticles from './FeatureArticles';
import Tutorials from './Tutorials';

const HomePage = () => {
  return (
    <Container style={{ marginTop: '2em' }}>
      <Header as='h1'>Welcome to DEV@Deakin</Header>
      <Header as='h2'>Featured Articles</Header>
      {/* <FeatureArticles />  */}
      <Header as='h2'>Latest Tutorials</Header>
      <Tutorials />
    </Container>
  );
};

export default HomePage;