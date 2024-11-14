import React from 'react';
import { Provider } from 'react-redux';
import { Box, Container, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import store from './redux/store';
import MoodInput from './components/MoodInput';
import RecommendationList from './components/RecommendationList';

function App() {
  return (
    <Provider store={store}>
      <Box
        sx={{
          minHeight: '100vh',
          background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Container maxWidth="md">
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Typography variant="h2" component="h1" align="center" gutterBottom sx={{ color: 'white', fontWeight: 'bold' }}>
              Mood Recommender
            </Typography>
            <MoodInput />
            <RecommendationList />
          </motion.div>
        </Container>
      </Box>
    </Provider>
  );
}

export default App;