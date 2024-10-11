import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { theme, GlobalStyles } from './theme';
import Main from './pages/main/Main';
import Game from './pages/game/Game';
import Ranking from './pages/ranking/Ranking';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <GlobalStyles />
      <Router>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/game" element={<Game />} />
          <Route path="/ranking" element={<Ranking />} />
        </Routes>
      </Router>
    </ChakraProvider>
  </React.StrictMode>
);

reportWebVitals();