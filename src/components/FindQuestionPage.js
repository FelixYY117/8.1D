import "../FindQuestionPage.css"
import React, { useState, useEffect } from 'react';
import { Container, Header, Card, Button, Input, Dropdown, Icon, Image, Confirm } from 'semantic-ui-react';
import { collection, getDocs, query, orderBy, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';

const FindQuestionPage = () => {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [filterType, setFilterType] = useState('');
  const [filterValue, setFilterValue] = useState('');
  const [expandedCard, setExpandedCard] = useState(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const q = query(collection(db, 'posts'), orderBy('date', 'desc'));
      const querySnapshot = await getDocs(q);
      const fetchedPosts = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setPosts(fetchedPosts);
      setFilteredPosts(fetchedPosts);
    } catch (error) {
      console.error("Error fetching posts: ", error);
    }
  };

  const handleFilter = () => {
    if (!filterType || !filterValue) {
      setFilteredPosts(posts);
      return;
    }

    const filtered = posts.filter(post => {
      switch (filterType) {
        case 'date':
          return post.date.includes(filterValue);
        case 'tag':
          return post.tags.some(tag => 
            tag.toLowerCase().includes(filterValue.toLowerCase())
          );
        case 'title':
          return post.title.toLowerCase().includes(filterValue.toLowerCase());
        default:
          return true;
      }
    });

    setFilteredPosts(filtered);
  };

  const toggleCardExpansion = (id) => {
    setExpandedCard(expandedCard === id ? null : id);
  };

  const handleDelete = async (id) => {
    setDeleteId(id);
    setConfirmOpen(true);
  };

  const confirmDelete = async () => {
    if (deleteId) {
      try {
        await deleteDoc(doc(db, 'posts', deleteId));
        setFilteredPosts(filteredPosts.filter(post => post.id !== deleteId));
        setPosts(posts.filter(post => post.id !== deleteId));
      } catch (error) {
        console.error("Error deleting document: ", error);
      }
    }
    setConfirmOpen(false);
  };

  const filterOptions = [
    { key: 'date', text: 'Date', value: 'date' },
    { key: 'tag', text: 'Tag', value: 'tag' },
    { key: 'title', text: 'Title', value: 'title' },
  ];

  return (
    <Container>
      <Header as="h1" className="header">Find Questions</Header>

      <div style={{ marginBottom: '20px' }}>
        <Dropdown
          selection
          options={filterOptions}
          placeholder="Select Filter Type"
          value={filterType}
          onChange={(e, { value }) => setFilterType(value)}
        />
        <Input 
          placeholder="Filter Value"
          value={filterValue}
          onChange={(e) => setFilterValue(e.target.value)}
          style={{ marginLeft: '10px' }}
        />
        <Button onClick={handleFilter} style={{ marginLeft: '10px' }}>Filter</Button>
      </div>
      <Card.Group className="card-group">
        {filteredPosts.map((post) => (
          <Card key={post.id} fluid>
            <Card.Content>
              <Card.Header>{post.title}</Card.Header>
              <Card.Meta>
                {new Date(post.date).toLocaleDateString()} - Type: {post.type}
              </Card.Meta>
              <Card.Description>
                {expandedCard === post.id ? post.description : `${post.description.substring(0, 100)}...`}
              </Card.Description>
              {expandedCard === post.id && post.imageUrl && (
                <Image src={post.imageUrl} wrapped ui={false} />
              )}
            </Card.Content>
            <Card.Content extra>
              <div>
                {post.tags.map((tag, index) => (
                  <span key={index} style={{ marginRight: '5px' }}>#{tag}</span>
                ))}
              </div>
              <Button
                basic
                color="blue"
                onClick={() => toggleCardExpansion(post.id)}
                style={{ marginTop: '10px' }}
              >
                {expandedCard === post.id ? 'Show Less' : 'Show More'}
                <Icon name={expandedCard === post.id ? 'angle up' : 'angle down'} />
              </Button>
              <Button
                basic
                color="red"
                onClick={() => handleDelete(post.id)}
                style={{ marginTop: '10px', marginLeft: '10px' }}
              >
                Delete
              </Button>
            </Card.Content>
          </Card>
        ))}
      </Card.Group>
      <Confirm
        open={confirmOpen}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={confirmDelete}
        content="Are you sure you want to delete this post?"
      />
    </Container>
  );
};

export default FindQuestionPage;