import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Layout from "./pages/index";
import TopNews from "./pages/TopNews";
import Categories from "./pages/Categories";

import "./styles.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false
    }
  }
});

const App: React.FC = () => (
  <QueryClientProvider client={queryClient}>
    <Routes>
      <Route path=":country" element={<Layout />}>
        <Route path="top-news" element={<TopNews />} />
        <Route path="categories" element={<Categories />}></Route>
        <Route path="categories/:category" element={<TopNews />} />
        <Route path="search" element={<TopNews />} />
      </Route>
      <Route path="*" element={<Navigate to="/us/top-news" />} />
    </Routes>
  </QueryClientProvider>
);

export default App;
