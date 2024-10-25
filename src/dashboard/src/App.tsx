import { useEffect } from "react";
import { useAuth } from "./context/Context";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Footer, Layout, Navbar } from "./components";
import Home from "./pages/Home/Home";
import Userdashboard from "./features/dashboard/Userdashboard";
import Trade from "./features/trade/Trade";

const App = () => {
  const { isAuthenticated, identity } =
    useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      callBackend();
    }
  }, [isAuthenticated]);

  const callBackend = async () => {
    console.log(identity.getPrincipal().toString());
    // const res = await backendActor.getUsers();
    // console.log(res);
  };

  return (
    <div className="bg-gradient-to-br from-customPurple to-customPink min-h-screen text-white py-5 px-20">     
     <Navbar />
      <Routes>
        <Route index element={<Home />} />
        <Route path="/dashboard" element={<Userdashboard />} />
        <Route path="/trade" element={<Trade />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
