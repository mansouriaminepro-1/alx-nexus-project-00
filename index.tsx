import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import RootLayout from './app/layout';
import LandingPage from './app/page';
import CreatePollPage from './app/create-poll/page';
import DashboardPage from './app/dashboard/page';
import LoginPage from './app/(auth)/login/page';
import VotePage from './app/poll/[id]/page';
import ResultsPage from './app/poll/[id]/results/page';
import './styles/globals.css';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const Router = () => {
  const [currentPath, setCurrentPath] = useState(() => {
    if (typeof window !== 'undefined') {
       try {
         return window.location.pathname;
       } catch (e) {
         return '/';
       }
    }
    return '/';
  });

  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname);
    };

    const handleCustomNavigate = (e: Event) => {
      const customEvent = e as CustomEvent<string>;
      if (customEvent.detail) {
        setCurrentPath(customEvent.detail);
      }
    };

    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('navigate', handleCustomNavigate as EventListener);
    
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');
      
      if (anchor && anchor.getAttribute('href')?.startsWith('/')) {
        e.preventDefault();
        const path = anchor.getAttribute('href');
        if (path) {
          try {
            window.history.pushState({}, '', path);
          } catch (err) {
            console.warn('Navigation URL update failed (likely due to sandbox), falling back to internal state.', err);
          }
          setCurrentPath(path);
          window.scrollTo(0, 0);
        }
      }
    };

    document.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('navigate', handleCustomNavigate as EventListener);
      document.removeEventListener('click', handleClick);
    };
  }, []);

  let Component = LandingPage;
  let showNavbar = true;
  let showFooter = true;
  
  // Exact matches
  if (currentPath === '/create-poll') {
    Component = CreatePollPage;
  } else if (currentPath === '/dashboard') {
    Component = DashboardPage;
    showNavbar = false;
    showFooter = false;
  } else if (currentPath === '/login') {
    Component = LoginPage;
    showNavbar = false;
    showFooter = false;
  } 
  // Dynamic matches
  else if (currentPath.startsWith('/poll/') && currentPath.endsWith('/results')) {
    Component = ResultsPage;
  } else if (currentPath.startsWith('/poll/')) {
    Component = VotePage;
  }

  return (
    <RootLayout showNavbar={showNavbar} showFooter={showFooter}>
      <Component />
    </RootLayout>
  );
};

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <Router />
  </React.StrictMode>
);