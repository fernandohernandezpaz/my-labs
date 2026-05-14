import './App.css'
import { lazy, Suspense } from 'react';
import { Routes, Route, Link, Navigate } from 'react-router-dom';
// import LoadingFallback from './components/LoadingFallback'
const LoadingFallback = lazy(() => import('./components/LoadingFallback'))
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Settings = lazy(() => import('./pages/Settings'));

function App() {

  return (
    <Suspense fallback={<LoadingFallback />}>
      <nav>
        <Link to="/dashboard">Dashboard</Link>
        {' '}
        <Link to="/settings">Settings</Link>
      </nav>


      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/settings" element={<Settings/>}/>
      </Routes>
    </Suspense>
  )
}

export default App
