import { lazy, useState, Suspense } from 'react';

const LoadingFallback = lazy(() => import('../components/LoadingFallback'));
const AnalyticsChart = lazy(() => import('../components/AnalyticsChart'));

function Settings() {
  const [showChart, setShowChart] = useState(false);
  return (
    <>
      <h1>Settings</h1>
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
  )
}

export default Settings;
