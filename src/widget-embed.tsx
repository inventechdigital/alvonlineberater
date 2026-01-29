/**
 * OnlineBerater Embed Script (Native DOM, no Shadow DOM)
 * 
 * This script mounts the OnlineBerater directly into a div element,
 * inheriting all page styles. No style isolation.
 * 
 * Usage:
 * <div id="onlineberater"></div>
 * <script src="path/to/onlineberater-embed.js"></script>
 */

import React from 'react';
import ReactDOM from 'react-dom/client';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Toaster as Sonner } from '@/components/ui/sonner';
import OnlineBerater from '@/components/berater/OnlineBerater';
import Ergebnis from '@/pages/Ergebnis';

// Import base styles (will merge with page styles)
import './widget/embed-styles.css';

const queryClient = new QueryClient();

const EmbedApp = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Sonner />
      <MemoryRouter>
        <Routes>
          <Route path="/" element={<OnlineBerater />} />
          <Route path="/ergebnis" element={<Ergebnis />} />
        </Routes>
      </MemoryRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

// Find mount point and render
const mountWidget = () => {
  const container = document.getElementById('onlineberater');
  
  if (!container) {
    console.error(
      'OnlineBerater: Mount point not found. Please add <div id="onlineberater"></div> to your page.'
    );
    return;
  }

  // Add class for styling hooks
  container.classList.add('onlineberater-container');

  const root = ReactDOM.createRoot(container);
  root.render(<EmbedApp />);
  
  console.log('OnlineBerater mounted successfully.');
};

// Mount when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', mountWidget);
} else {
  mountWidget();
}
