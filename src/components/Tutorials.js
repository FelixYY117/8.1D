import React from 'react';
import { Card, Image } from 'semantic-ui-react';
import { faker } from '@faker-js/faker';

const tutorials = [
  {
    title: faker.lorem.sentence(),
    description: faker.lorem.paragraph(),
    image: faker.image.image(),
  },
  {
    title: faker.lorem.sentence(),
    description: faker.lorem.paragraph(),
    image: faker.image.image(),
  },
  {
    title: faker.lorem.sentence(),
    description: faker.lorem.paragraph(),
    image: faker.image.image(),
  },
];

const Tutorials = () => (
  <Card.Group>
    {tutorials.map((tutorial, index) => (
      <Card key={index}>
        <Image src={tutorial.image} wrapped ui={false} />
        <Card.Content>
          <Card.Header>{tutorial.title}</Card.Header>
          <Card.Description>{tutorial.description}</Card.Description>
        </Card.Content>
      </Card>
    ))}
  </Card.Group>
);

export default Tutorials;
