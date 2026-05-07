import { StrictMode, useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { StageManager } from './lib/StageManager';

const API_KEY = process.env.GOOGLE_MAPS_PLATFORM_KEY || '';

// We use a small React wrapper to provide the full-screen layout, 
// but the Map logic will live in StageManager.
function Root() {
  const stageRef = useRef<StageManager | null>(null);

  useEffect(() => {
    if (!stageRef.current && API_KEY) {
      stageRef.current = new StageManager(API_KEY);
      stageRef.current.start();
    }
  }, []);

  return <App />;
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Root />
  </StrictMode>,
);
