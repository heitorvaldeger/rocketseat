import { BrowserRouter, Route, Routes } from "react-router-dom"
import { HomePage } from "./pages/HomePage"
import { DefaultLayout } from "./pages/_layouts/DefaultLayout"
import { IssuePage } from "./pages/IssuePage"

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<DefaultLayout/>}>
          <Route index element={<HomePage/>} path="/" />
          <Route element={<IssuePage />} path="post/:id"/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}