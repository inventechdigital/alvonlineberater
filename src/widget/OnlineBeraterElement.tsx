import React from 'react';
import ReactDOM from 'react-dom/client';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Toaster as Sonner } from '@/components/ui/sonner';
import OnlineBerater from '@/components/berater/OnlineBerater';
import Ergebnis from '@/pages/Ergebnis';

// Styles to be injected into Shadow DOM
import widgetStyles from './widget-styles.css?inline';

const queryClient = new QueryClient();

const WidgetApp = () => (
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

class OnlineBeraterElement extends HTMLElement {
  private root: ReactDOM.Root | null = null;
  private mountPoint: HTMLDivElement | null = null;
  private shadow: ShadowRoot | null = null;

  static get observedAttributes() {
    return ['src'];
  }

  constructor() {
    super();
  }

  connectedCallback() {
    // Create Shadow DOM for style isolation
    this.shadow = this.attachShadow({ mode: 'open' });

    // Create style element with all widget styles
    const styleElement = document.createElement('style');
    styleElement.textContent = widgetStyles;
    this.shadow.appendChild(styleElement);

    // Create mount point for React
    this.mountPoint = document.createElement('div');
    this.mountPoint.className = 'onlineberater-root';
    this.shadow.appendChild(this.mountPoint);

    // Mount React app
    this.root = ReactDOM.createRoot(this.mountPoint);
    this.root.render(<WidgetApp />);
  }

  disconnectedCallback() {
    // Cleanup React root when element is removed
    if (this.root) {
      this.root.unmount();
      this.root = null;
    }
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (name === 'src' && oldValue !== newValue) {
      // Handle src attribute changes if needed
      console.log('OnlineBerater src changed:', newValue);
    }
  }
}

// Register custom element (name MUST contain a hyphen per Web Component spec)
if (!customElements.get('online-berater')) {
  customElements.define('online-berater', OnlineBeraterElement);
}

export default OnlineBeraterElement;
