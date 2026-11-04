import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import './styles/sections.css';

document.documentElement.classList.remove('no-js');
// Opt into motion only once React is actually driving the page.
document.documentElement.classList.add('js-motion');

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
