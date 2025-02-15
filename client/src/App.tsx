import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Browse } from "./pages/Browse";
import { Home } from "./pages/Home";
import News from "./pages/News";
import { NavBar } from "./components/navbar";
import { Support } from "./pages/Support";
import Footer from "./components/footer";
import { useEffect, useState } from "react";
import { Dashboard } from "./pages/Dashboard";
import { Matches } from "./pages/Matches";
import 'bootstrap/dist/css/bootstrap.min.css';
import QandA from "./components/q and a/QandA";
import Leaderboard from "./components/leaderboard/Leaderboard";

export default function App() {
  const [token, setToken] = useState(false);

  if (token) {
    sessionStorage.setItem("token", JSON.stringify(token));
  }

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      const data = JSON.parse(sessionStorage.getItem("token") as string);
      setToken(data);
    }
  }, []);

  return (
    <div className="">
      <NavBar token={token} setToken={setToken} />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/browse" element={<Browse />} />
          <Route path="/messages" element={<Matches />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/support" element={<Support />} />
          <Route path="/news" element={<News />} />
          <Route path="/qnda" element={<QandA />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}
