import { Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";
import LoadingScreen from "./components/LoadingScreen";
import Layout from "./pages/App/components/Layout";

const Home = lazy(() => import("./pages/Home/Home"));
const Dash = lazy(() => import("./pages/App/Dash"));
const Dashboard = lazy(() => import("./pages/Dashboard/Dashboard"));
const Trade = lazy(() => import("./pages/Trade/Trade"));
const Insurance = lazy(() => import("./pages/Insurance/Insurance"));
const Stacking = lazy(() => import("./pages/Stacking/Stacking"));
const History = lazy(() => import("./pages/History/History"));
const Governance = lazy(() => import("./pages/Governance/Governance"));

const App = () => {


  return (
    <Suspense fallback={<LoadingScreen />}>
    <Routes>
      <Route index element={<Home />} />
      <Route element={<Layout />}>
        <Route path="/app" element={<Dash />} />
        <Route path="/trade" element={<Trade />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/insurance" element={<Insurance />} />
        <Route path="/stacking" element={<Stacking />} />
        <Route path="/history" element={<History />} />
        <Route path="/governance" element={<Governance />} />
      </Route>
    </Routes>
    </Suspense>
  );
};

export default App;

