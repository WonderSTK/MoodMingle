import React from 'react';
import { useSelector } from 'react-redux';
import { Grid, Typography, CircularProgress } from '@mui/material';
import { motion } from 'framer-motion';
import RecommendationItem from './RecommendationItem';

function RecommendationList() {
  const { movies, books, songs, status, error } = useSelector((state) => state.recommendations);

  if (status === 'loading') {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}
      >
        <CircularProgress size={60} thickness={4} />
      </motion.div>
    );
  }

  if (status === 'failed') {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Typography variant="h6" color="error" align="center">
          Error: {error}
        </Typography>
      </motion.div>
    );
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <Grid container spacing={4}>
        <RecommendationSection title="Movies" items={movies} />
        <RecommendationSection title="Books" items={books} />
        <RecommendationSection title="Songs" items={songs} />
      </Grid>
    </motion.div>
  );
}

function RecommendationSection({ title, items }) {
  return (
    <Grid item xs={12} md={4}>
      <Typography variant="h5" gutterBottom sx={{ color: 'white', fontWeight: 'bold' }}>
        {title}
      </Typography>
      {items.map((item, index) => (
        <RecommendationItem
          key={index}
          item={item}
          type={title.toLowerCase().slice(0, -1)}
        />
      ))}
    </Grid>
  );
}

export default RecommendationList;