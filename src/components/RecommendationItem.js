import React from 'react';
import { Card, CardContent, CardMedia, Typography, Box, IconButton } from '@mui/material';
import { motion } from 'framer-motion';
import { Movie, Book, MusicNote, Favorite, FavoriteBorder } from '@mui/icons-material';

function RecommendationItem({ item, type, onSelect, isFavorite, onToggleFavorite }) {
  const getImageUrl = () => {
    switch (type) {
      case 'movie':
        return item.poster_path
          ? `https://image.tmdb.org/t/p/w200${item.poster_path}`
          : 'https://via.placeholder.com/200x300?text=Movie';
      case 'book':
        return item.coverUrl || 'https://via.placeholder.com/200x300?text=Book';
      case 'song':
        return item.image?.[2]['#text'] || 'https://via.placeholder.com/200x200?text=Song';
      default:
        return 'https://via.placeholder.com/200x200';
    }
  };

  const getSubtitle = () => {
    switch (type) {
      case 'movie':
        return item.release_date ? item.release_date.split('-')[0] : 'N/A';
      case 'book':
        return item.authors?.join(', ') || 'Unknown';
      case 'song':
        return item.artist;
      default:
        return '';
    }
  };

  const getIcon = () => {
    switch (type) {
      case 'movie':
        return <Movie />;
      case 'book':
        return <Book />;
      case 'song':
        return <MusicNote />;
      default:
        return null;
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div variants={itemVariants}>
      <Card
        sx={{
          display: 'flex',
          height: '100px',
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          transition: '0.3s',
          '&:hover': {
            transform: 'scale(1.03)',
            boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
          },
          cursor: 'pointer',
        }}
      >
        <CardMedia
          component="img"
          sx={{ width: 100, height: '100%', objectFit: 'cover' }}
          image={getImageUrl()}
          alt={item.title}
          onClick={onSelect}
        />
        <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1, overflow: 'hidden' }}>
          <CardContent sx={{ flex: '1 0 auto', py: 1, '&:last-child': { pb: 1 } }}>
            <Typography component="div" variant="subtitle1" noWrap sx={{ display: 'flex', alignItems: 'center' }}>
              {getIcon()}
              <Box component="span" sx={{ ml: 1, overflow: 'hidden', textOverflow: 'ellipsis' }} onClick={onSelect}>{item.title}</Box>
            </Typography>
            <Typography variant="subtitle2" color="text.secondary" component="div" noWrap onClick={onSelect}>
              {getSubtitle()}
            </Typography>
          </CardContent>
        </Box>
        <IconButton 
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite();
          }}
          sx={{ alignSelf: 'center', mr: 1 }}
        >
          {isFavorite ? <Favorite color="secondary" /> : <FavoriteBorder />}
        </IconButton>
      </Card>
    </motion.div>
  );
}

export default RecommendationItem;