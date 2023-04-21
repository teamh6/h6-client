import React from "react";
import Footer from "./components/Layout/Footer/Footer";
import { Header } from "./components/Layout/Header/Header";
import { Sidebar } from "./components/Sidebar";
import { Content } from "./components/Content";

export default function GodownEntry() {
  return (
    <div>
      <Header />
      <Sidebar />
      <Content />
      <Footer />
    </div>
  );
}
