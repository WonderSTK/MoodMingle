import React from 'react';
import { motion } from 'framer-motion';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Box, IconButton } from '@mui/material';
import { Movie, Book, MusicNote, Favorite, FavoriteBorder } from '@mui/icons-material';

function DetailView({ item, onClose, isFavorite, onToggleFavorite }) {
  const getIcon = () => {
    switch (item.type) {
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

  const getImageUrl = () => {
    switch (item.type) {
      case 'movie':
        return item.poster_path
          ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
          : 'https://via.placeholder.com/500x750?text=Movie';
      case 'book':
        return item.coverUrl || 'https://via.placeholder.com/500x750?text=Book';
      case 'song':
        return item.image?.[3]['#text'] || 'https://via.placeholder.com/500x500?text=Song';
      default:
        return 'https://via.placeholder.com/500x500';
    }
  };

  const getAdditionalInfo = () => {
    switch (item.type) {
      case 'movie':
        return (
          <>
            <Typography variant="body1">Release Date: {item.release_date || 'N/A'}</Typography>
            <Typography variant="body1">Rating: {item.vote_average}/10</Typography>
            <Typography variant="body1">Runtime: {item.runtime} minutes</Typography>
          </>
        );
      case 'book':
        return (
          <>
            <Typography variant="body1">Author(s): {item.authors?.join(', ') || 'Unknown'}</Typography>
            <Typography variant="body1">Published: {item.publishedDate || 'N/A'}</Typography>
            <Typography variant="body1">Pages: {item.pageCount || 'N/A'}</Typography>
          </>
        );
      case 'song':
        return (
          <>
            <Typography variant="body1">Artist: {item.artist}</Typography>
            <Typography variant="body1">Album: {item.album}</Typography>
            <Typography variant="body1">Year: {item.year || 'N/A'}</Typography>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <Dialog
      open={true}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      PaperComponent={motion.div}
      PaperProps={{
        initial: { y: -50, opacity: 0 },
        animate: { y: 0, opacity: 1 },
        transition: { type: 'spring', stiffness: 300, damping: 30 },
      }}
    >
      <DialogTitle sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: 'primary.main', color: 'white' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {getIcon()}
          <Box component="span" sx={{ ml: 1 }}>{item.title}</Box>
        </Box>
        <IconButton onClick={onToggleFavorite} sx={{ color: 'white' }}>
          {isFavorite ? <Favorite /> : <FavoriteBorder />}
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 2 }}>
          <img
            src={getImageUrl()}
            alt={item.title}
            style={{ maxWidth: '100%', height: 'auto', marginBottom: '1rem' }}
          />
          {getAdditionalInfo()}
          {item.overview && (
            <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
              {item.overview}
            </Typography>
          )}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
        <Button
          onClick={() => window.open(`https://www.google.com/search?q=${encodeURIComponent(`${item.title} ${item.type}`)}`, '_blank')}
          color="primary"
        >
          Learn More
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DetailView;