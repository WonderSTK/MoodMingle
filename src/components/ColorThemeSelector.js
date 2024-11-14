import React from 'react';
import { motion } from 'framer-motion';
import { Box, Button, Typography } from '@mui/material';

const themes = [
  { name: 'Default', value: 'default', color: '#3f51b5' },
  { name: 'Dark', value: 'dark', color: '#424242' },
  { name: 'Light', value: 'light', color: '#f5f5f5' },
];

function ColorThemeSelector({ onSelect, onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.3 }}
      style={{
        position: 'fixed',
        top: '70px',
        right: '20px',
        backgroundColor: 'white',
        borderRadius: '8px',
        padding: '16px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        zIndex: 1000,
      }}
    >
      <Typography variant="h6" gutterBottom>
        Select Theme
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        {themes.map((theme) => (
          <Button
            key={theme.value}
            onClick={() => onSelect(theme.value)}
            variant="outlined"
            startIcon={
              <Box
                sx={{
                  width: 20,
                  height: 20,
                  borderRadius: '50%',
                  backgroundColor: theme.color,
                }}
              />
            }
          >
            {theme.name}
          </Button>
        ))}
      </Box>
      <Button onClick={onClose} sx={{ mt: 2 }}>
        Close
      </Button>
    </motion.div>
  );
}

export default ColorThemeSelector;