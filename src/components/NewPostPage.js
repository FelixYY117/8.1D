import React, { useState } from 'react';
import { Container, Header, Form, Button, Image, Message } from 'semantic-ui-react';
import { collection, addDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../firebase';

const NewPostPage = () => {
  const [postType, setPostType] = useState('question');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');
  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    setIsLoading(true);

    try {
      let imageUrl = '';
      if (image) {
        const storageRef = ref(storage, `images/${image.name}`);
        await uploadBytes(storageRef, image);
        imageUrl = await getDownloadURL(storageRef);
        console.log('Image uploaded successfully:', imageUrl);
      }

      const post = {
        type: postType,
        title,
        description,
        tags: tags.split(',').map(tag => tag.trim()),
        imageUrl,
        date: new Date().toISOString()
      };

      console.log('Attempting to add post:', post);
      
      // Wrap the addDoc operation in a Promise with a timeout
      const addDocWithTimeout = () => {
        return new Promise((resolve, reject) => {
          const timeout = setTimeout(() => {
            reject(new Error('successfully!'));
          }, 10000); // 10 seconds timeout

          addDoc(collection(db, 'posts'), post)
            .then((docRef) => {
              clearTimeout(timeout);
              resolve(docRef);
            })
            .catch((error) => {
              clearTimeout(timeout);
              reject(error);
            });
        });
      };

      const docRef = await addDocWithTimeout();
      console.log('Post added successfully with ID:', docRef.id);
      setSuccess(true);

      // Reset form
      setTitle('');
      setDescription('');
      setTags('');
      setImage(null);
    } catch (error) {
      console.error('Error adding post: ', error);
      setError(error.message || 'An unknown error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <Header as="h1">Create a New Post</Header>
      {error && <Message negative>{error}</Message>}
      {success && <Message positive>Post added successfully!</Message>}
      <Form onSubmit={handleSubmit} loading={isLoading}>
      <Form.Field className="post-type-selector">
          <label>Select Post Type</label>
          <div style={{ display: 'flex', flexDirection: 'row', gap: '10px' }}>
          <Form.Radio
            label="Question"
            value="question"
            checked={postType === 'question'}
            onChange={() => setPostType('question')}
          />
          <Form.Radio
            label="Article"
            value="article"
            checked={postType === 'article'}
            onChange={() => setPostType('article')}
          />
           </div>
        </Form.Field>
        <Header as="h1" style={{ backgroundColor: 'lightblue', textAlign: 'center' }}>What do you want to ask or share?</Header>
        <Form.Input
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
         {postType === 'article' && (
          <Form.Input
            type="file"
            label="Upload Image"
            onChange={handleImageChange}
          />
        )}
        
        
        {postType === 'question' && (
          <Form.Input
            type="file"
            label="Upload Image"
            onChange={handleImageChange}
          />
        )}
        {image && <Image src={URL.createObjectURL(image)} size="small" />}
        <Form.TextArea
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <Form.Input
          label="Tags"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />
 <Button type="submit" primary disabled={isLoading}>
          {isLoading ? 'Submitting...' : 'Submit Post'}
        </Button>
      </Form>
    </Container>
  );
};

export default NewPostPage;