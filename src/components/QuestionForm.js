import React, { useState } from 'react';
import { Form, Button } from 'semantic-ui-react';

const QuestionForm = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ title, description, tags: tags.split(',').map(tag => tag.trim()) });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Input
        label="Question Title"
        placeholder="Enter your question"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <Form.TextArea
        label="Description"
        placeholder="Provide more details about your question"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <Form.Input
        label="Tags"
        placeholder="Enter tags separated by commas"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
      />
      <Button type="submit" primary>POST</Button>
    </Form>
  );
};

export default QuestionForm;