import { useState, lazy, Suspense } from 'react';
// import LoadingFallback from '../components/LoadingFallback';

const LoadingFallback = lazy(() => import('../components/LoadingFallback'));
const AnalyticsChart = lazy(() => import('../components/AnalyticsChart'));

function Dashboard() {
  const [showChart, setShowChart] = useState(false);

  return (
    <>
      <h1>Dashboard</h1>
      <label htmlFor="showChart">
        <input
          id="showChart"
          type="checkbox"
          checked={showChart}
          onChange={(e) => setShowChart(e.target.checked)}
        />Show Chart
      </label>

      {
        showChart && (
          <Suspense fallback={<LoadingFallback/>}>
            <AnalyticsChart />
          </Suspense>

        )
      }


    </>
  );
}

export default Dashboard;
