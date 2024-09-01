import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import Header from './components/Header';
import FeaturedArticles from './components/FeaturedArticles';
import Tutorials from './components/Tutorials';
import Footer from './components/Footer';
import ImageSlider from './components/ImageSlider';
import Subscribe from './components/Subscribe';
import HomePage from './components/HomePage';
import NewPostPage from './components/NewPostPage';
import FindQuestionPage from './components/FindQuestionPage';
import Login from './components/Login';
import Register from './components/Register';
import 'semantic-ui-css/semantic.min.css';
import './App.css';

const App = () => (
  <Router>
    <div>
      <Header />
      <Routes>
        <Route path="/" element={
          <>
            <div>
              <ImageSlider />
            </div>
            <Container style={{ marginTop: '2em', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <h1>Featured Articles</h1>
              <FeaturedArticles />
              <h1>Featured Tutorials</h1>
              <Tutorials />
            </Container>
            <div style={{ marginTop: '2em', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Subscribe />
            </div>
          </>
        } />
        <Route path="/" element={<HomePage />} />
          <Route path="/post" element={<NewPostPage />} />
          <Route path="/questions" element={<FindQuestionPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      <Footer />
    </div>
  </Router>
);

export default App;