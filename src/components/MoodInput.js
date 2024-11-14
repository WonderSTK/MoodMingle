import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { TextField, Button, Box } from '@mui/material';
import { motion } from 'framer-motion';
import { fetchRecommendations } from '../redux/recommendationsSlice';

function MoodInput({ onMoodSubmit }) {
  const [mood, setMood] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (mood.trim()) {
      dispatch(fetchRecommendations(mood));
      onMoodSubmit(mood);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3, duration: 0.5 }}
      style={{ width: '100%' }}
    >
      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2, mb: 4, width: '100%' }}>
        <TextField
          fullWidth
          variant="outlined"
          value={mood}
          onChange={(e) => setMood(e.target.value)}
          placeholder="Enter your mood..."
          sx={{ 
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            borderRadius: 1,
            '& .MuiOutlinedInput-root': {
              height: '56px',
              '&:hover fieldset': {
                borderColor: 'white',
              },
            },
          }}
        />
        <Button
          type="submit"
          variant="contained"
          color="secondary"
          sx={{ 
            px: 4,
            height: '56px',
            backgroundColor: '#f50057',
            '&:hover': {
              backgroundColor: '#ff4081',
            },
            width: { xs: '100%', sm: 'auto' },
          }}
        >
          Get Recommendations
        </Button>
      </Box>
    </motion.div>
  );
}

export default MoodInput;