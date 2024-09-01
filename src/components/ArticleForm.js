import React, { useState } from 'react';
import { Form, Button } from 'semantic-ui-react';

const ArticleForm = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const [abstract, setAbstract] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ title, abstract, content, tags: tags.split(',').map(tag => tag.trim()) });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Input
        label="Article Title"
        placeholder="Enter the title of your article"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <Form.TextArea
        label="Abstract"
        placeholder="Provide a brief summary of your article"
        value={abstract}
        onChange={(e) => setAbstract(e.target.value)}
        required
      />
      <Form.TextArea
        label="Content"
        placeholder="Write your article content here"
        value={content}
        onChange={(e) => setContent(e.target.value)}
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

export default ArticleForm;