import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import '@/styles/index.css';
import { App } from './app';

// No <StrictMode> here: react-leaflet is pinned to 4.2.1 for Mendix
// compatibility, and its MapContainer has a StrictMode-only bug where the
// dev-mode double mount/unmount/remount throws "Map container is already
// initialized." StrictMode's double-invoke is compiled out of production
// builds anyway, so this only affects this local playground, not consumers.
createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
);
