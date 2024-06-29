"use client";
import React from "react";
import HomePage from "./components/HomePage";
import RootLayout from "./layout";

const Home: React.FC = () => {
  return (
    <RootLayout>
      <HomePage />
    </RootLayout>
  );
};

export default Home;
