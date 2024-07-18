// Navbar.js
import React from "react";
import { Navbar } from "flowbite-react";
import { LoginDialog } from "./login/LoginDialog";
import { useUserStore } from "@/store/userStore";
import { Button } from "@/components/ui/button";
import QandA from "./q and a/QandA";

export default function NavBar({ token, setToken }) {
  const handleLogout = () => {
    setToken(false);
    sessionStorage.removeItem("token");
  };

  return (
    <Navbar fluid rounded>
      <Navbar.Brand href="/">
        <img alt="Loander Logo" className="mr-3" src="loander_logo.svg" />
      </Navbar.Brand>
      <div className="flex md:order-2">
        <QandA />
      </div>
      <div className="flex md:order-2">
        {!token ? (
          <LoginDialog setToken={setToken} />
        ) : (
          <Button onClick={handleLogout}>Logout</Button>
        )}

        <Navbar.Toggle />
      </div>

      <Navbar.Collapse>
        <Navbar.Link href="/">
          <p>Home</p>
        </Navbar.Link>
        <Navbar.Link href="/browse">Browse</Navbar.Link>
        <Navbar.Link href="/messages">Matches</Navbar.Link>
        <Navbar.Link href="/dashboard">Dashboard</Navbar.Link>
        <Navbar.Link href="/support">Support</Navbar.Link>
        <Navbar.Link href="/leaderboard">Leaderboard</Navbar.Link>
        <Navbar.Link href="/news">News</Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}

export { default as NavBar } from "./Navbar";
