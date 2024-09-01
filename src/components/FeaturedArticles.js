import React from 'react';
import { Card, Image } from 'semantic-ui-react';
import { faker } from '@faker-js/faker';

const articles = [
  {
    title: faker.lorem.sentence(),
    description: faker.lorem.paragraph(),
    image: faker.image.url(),
  },
  {
    title: faker.lorem.sentence(),
    description: faker.lorem.paragraph(),
    image: faker.image.url(),
  },
  {
    title: faker.lorem.sentence(),
    description: faker.lorem.paragraph(),
    image: faker.image.url(),
  },
];

const FeaturedArticles = () => (
  <Card.Group>
    {articles.map((article, index) => (
      <Card key={index}>
        <Image src={article.image} wrapped ui={false} />
        <Card.Content>
          <Card.Header>{article.title}</Card.Header>
          <Card.Description>{article.description}</Card.Description>
        </Card.Content>
      </Card>
    ))}
  </Card.Group>
);

export default FeaturedArticles;
