import { DefaultLayout } from "@/layouts/DefaultLayout";
import { History } from "@/pages/History";
import { Home } from "@/pages/Home";
import { Route, Routes } from "react-router-dom";

export const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/history" element={<History />} />
      </Route>
    </Routes>
  );
};
