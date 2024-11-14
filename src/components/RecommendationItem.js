import React from 'react';
import { Card, CardContent, CardMedia, Typography, Box } from '@mui/material';
import { motion } from 'framer-motion';

function RecommendationItem({ item, type }) {
  const getImageUrl = () => {
    switch (type) {
      case 'movie':
        return item.poster_path
          ? `https://image.tmdb.org/t/p/w200${item.poster_path}`
          : 'https://via.placeholder.com/200x300';
      case 'book':
        return item.coverUrl || 'https://via.placeholder.com/200x300';
      case 'song':
        return item.image?.[2]['#text'] || 'https://via.placeholder.com/200x200';
      default:
        return 'https://via.placeholder.com/200x200';
    }
  };

  const getSubtitle = () => {
    switch (type) {
      case 'movie':
        return item.release_date ? item.release_date.split('-')[0] : 'N/A';
      case 'book':
        return item.authors.join(', ');
      case 'song':
        return item.artist;
      default:
        return '';
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div variants={itemVariants}>
      <Card
        component="a"
        href={`https://www.google.com/search?q=${encodeURIComponent(`${item.title} ${type}`)}`}
        target="_blank"
        rel="noopener noreferrer"
        sx={{
          display: 'flex',
          mb: 2,
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          transition: '0.3s',
          '&:hover': {
            transform: 'scale(1.03)',
            boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
          },
          textDecoration: 'none',
          color: 'inherit',
        }}
      >
        <CardMedia
          component="img"
          sx={{ width: 80, height: 80, objectFit: 'cover' }}
          image={getImageUrl()}
          alt={item.title}
        />
        <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
          <CardContent sx={{ flex: '1 0 auto', py: 1 }}>
            <Typography component="div" variant="subtitle1" noWrap>
              {item.title}
            </Typography>
            <Typography variant="subtitle2" color="text.secondary" component="div">
              {getSubtitle()}
            </Typography>
          </CardContent>
        </Box>
      </Card>
    </motion.div>
  );
}

export default RecommendationItem;