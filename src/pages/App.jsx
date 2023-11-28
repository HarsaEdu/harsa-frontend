import { useState, useMemo } from "react";
import reactLogo from "../assets/react.svg";
import viteLogo from "../assets/vite.svg";
import AdminSidebar from "@/components/Sidebar/AdminSidebar";
import { Button } from "@/components/ui/button";
// import LandingPages from "./landingPage/Faq";
import { buttonVariants } from "@/components/ui/button";
// import { Link } from "lucide-react";
import Navbar from "@/components/ui/navbar";
// import Hero from "@/components/landing-page/hero";
// import GetApps from "@/components/landing-page/get-apps";
import { Input } from "@/components/ui/input";
import Login from "./login";
import Layout from "@/components/layout/Index";
import { CardUlasanUser } from "@/components/landing-page/card/cardulasanuser";

function App() {
  const userRole = 'admin'

  return (
    <Layout userRole={userRole}>
      
    </Layout>
  );
}

export default App;
