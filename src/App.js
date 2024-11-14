import React from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
import MoodInput from './components/MoodInput';
import RecommendationList from './components/RecommendationList';

function App() {
  return (
    <Provider store={store}>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">Mood Recommender</h1>
        <MoodInput />
        <RecommendationList />
      </div>
    </Provider>
  );
}

export default App;