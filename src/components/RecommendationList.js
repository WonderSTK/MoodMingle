import React from 'react';
import { useSelector } from 'react-redux';
import { Grid2, Typography, CircularProgress } from '@mui/material';
import { motion } from 'framer-motion';
import RecommendationItem from './RecommendationItem';
import { Movie, Book, MusicNote } from '@mui/icons-material';
import Box from '@mui/material/Box';

function RecommendationList({ onItemSelect, favorites, onToggleFavorite }) {
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
      <Grid2 container spacing={4}>
        <RecommendationSection 
          title="Movies" 
          items={movies} 
          onItemSelect={onItemSelect} 
          icon={<Movie />} 
          favorites={favorites}
          onToggleFavorite={onToggleFavorite}
        />
        <RecommendationSection 
          title="Books" 
          items={books} 
          onItemSelect={onItemSelect} 
          icon={<Book />} 
          favorites={favorites}
          onToggleFavorite={onToggleFavorite}
        />
        <RecommendationSection 
          title="Songs" 
          items={songs} 
          onItemSelect={onItemSelect} 
          icon={<MusicNote />} 
          favorites={favorites}
          onToggleFavorite={onToggleFavorite}
        />
      </Grid2>
    </motion.div>
  );
}

function RecommendationSection({ title, items, onItemSelect, icon, favorites, onToggleFavorite }) {
  return (
    <Grid2 item xs={12} md={4}>
      <Typography variant="h5" gutterBottom sx={{ color: 'white', fontWeight: 'bold', display: 'flex', alignItems: 'center' }}>
        {icon}
        <Box component="span" sx={{ ml: 1 }}>{title}</Box>
      </Typography>
      <Grid2 container spacing={2}>
        {items.map((item, index) => (
          <Grid2 item xs={12} key={index}>
            <RecommendationItem
              item={item}
              type={title.toLowerCase().slice(0, -1)}
              onSelect={() => onItemSelect({ ...item, type: title.toLowerCase().slice(0, -1) })}
              isFavorite={favorites.some(fav => fav.id === item.id && fav.type === title.toLowerCase().slice(0, -1))}
              onToggleFavorite={() => onToggleFavorite({ ...item, type: title.toLowerCase().slice(0, -1) })}
            />
          </Grid2>
        ))}
      </Grid2>
    </Grid2>
  );
}

export default RecommendationList;