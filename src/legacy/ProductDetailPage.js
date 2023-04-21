import React from "react";
import Footer from "./components/Layout/Footer/Footer";
import { Header } from "./components/Layout/Header/Header";
import { Lower } from "./components/Lower";
import { Upper } from "./components/Upper";

export default function GodownEntry() {
  return (
    <div>
      <Header />
      <Upper />
      <Lower />
      <Footer />
    </div>
  );
}
