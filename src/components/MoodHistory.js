import React from 'react';
import { Box, Typography, List, ListItem, ListItemText } from '@mui/material';
import { motion } from 'framer-motion';

function MoodHistory({ history }) {
  return (
    <Box
      sx={{
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: 2,
        padding: 2,
      }}
    >
      <Typography variant="h6" sx={{ color: 'white', mb: 2 }}>
        Mood History
      </Typography>
      <List>
        {history.slice().reverse().map((entry, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <ListItem>
              <ListItemText
                primary={entry.mood}
                secondary={entry.timestamp.toLocaleString()}
                primaryTypographyProps={{ sx: { color: 'white' } }}
                secondaryTypographyProps={{ sx: { color: 'rgba(255, 255, 255, 0.7)' } }}
              />
            </ListItem>
          </motion.div>
        ))}
      </List>
    </Box>
  );
}

export default MoodHistory;