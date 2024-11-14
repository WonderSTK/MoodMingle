import React, { useState } from 'react';
import { Provider } from 'react-redux';
import { Box, Container, Typography, IconButton } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Palette } from '@mui/icons-material';
import store from './redux/store';
import MoodInput from './components/MoodInput';
import RecommendationList from './components/RecommendationList';
import AnimatedBackground from './components/AnimatedBackground';
import DetailView from './components/DetailView';
import ColorThemeSelector from './components/ColorThemeSelector';

const themes = {
  default: createTheme({
    palette: {
      primary: { main: '#3f51b5' },
      secondary: { main: '#f50057' },
    },
  }),
  dark: createTheme({
    palette: {
      mode: 'dark',
      primary: { main: '#90caf9' },
      secondary: { main: '#f48fb1' },
    },
  }),
  light: createTheme({
    palette: {
      mode: 'light',
      primary: { main: '#1976d2' },
      secondary: { main: '#dc004e' },
    },
  }),
};

function App() {
  const [currentMood, setCurrentMood] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const [currentTheme, setCurrentTheme] = useState('default');
  const [showThemeSelector, setShowThemeSelector] = useState(false);
  const [favorites, setFavorites] = useState([]);

  const handleMoodSubmit = (mood) => {
    setCurrentMood(mood);
  };

  const handleItemSelect = (item) => {
    setSelectedItem(item);
  };

  const handleThemeChange = (theme) => {
    setCurrentTheme(theme);
    setShowThemeSelector(false);
  };

  const toggleFavorite = (item) => {
    setFavorites(prevFavorites => {
      const index = prevFavorites.findIndex(fav => fav.id === item.id && fav.type === item.type);
      if (index === -1) {
        return [...prevFavorites, item];
      } else {
        return prevFavorites.filter((_, i) => i !== index);
      }
    });
  };

  return (
    <Provider store={store}>
      <ThemeProvider theme={themes[currentTheme]}>
        <CssBaseline />
        <AnimatedBackground mood={currentMood}>
          <Container maxWidth="lg" sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Box
              sx={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                zIndex: 1,
                py: 4,
                overflow: 'auto'
              }}
            >
              <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                style={{ width: '100%' }}
              >
                <Typography variant="h2" component="h1" align="center" gutterBottom sx={{ color: 'white', fontWeight: 'bold', fontSize: { xs: '2rem', sm: '3rem', md: '3.75rem' } }}>
                  Mood Recommender
                </Typography>
                <Box sx={{ position: 'absolute', top: 16, right: 16 }}>
                  <IconButton onClick={() => setShowThemeSelector(!showThemeSelector)} sx={{ color: 'white' }}>
                    <Palette />
                  </IconButton>
                </Box>
                <MoodInput onMoodSubmit={handleMoodSubmit} />
                <Box sx={{ mt: 4, overflow: 'auto', maxHeight: 'calc(100vh - 250px)' }}>
                  <RecommendationList 
                    onItemSelect={handleItemSelect} 
                    favorites={favorites} 
                    onToggleFavorite={toggleFavorite} 
                  />
                </Box>
              </motion.div>
            </Box>
          </Container>
        </AnimatedBackground>
        <AnimatePresence>
          {selectedItem && (
            <DetailView 
              item={selectedItem} 
              onClose={() => setSelectedItem(null)} 
              isFavorite={favorites.some(fav => fav.id === selectedItem.id && fav.type === selectedItem.type)}
              onToggleFavorite={() => toggleFavorite(selectedItem)}
            />
          )}
          {showThemeSelector && (
            <ColorThemeSelector onSelect={handleThemeChange} onClose={() => setShowThemeSelector(false)} />
          )}
        </AnimatePresence>
      </ThemeProvider>
    </Provider>
  );
}

export default App;