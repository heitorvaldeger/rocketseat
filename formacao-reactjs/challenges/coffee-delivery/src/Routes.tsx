import { BrowserRouter, Routes, Route } from "react-router-dom"
import { DefaultLayout } from "./views/_layouts/DefaultLayout"
import { HomeView } from "./views/Home"
import { CartView } from "./views/Cart"
import { SuccessView } from "./views/Success"

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<DefaultLayout/>}>
          <Route path="/" element={<HomeView/>}/>
          <Route path="/cart" element={<CartView/>}/>
          <Route path="/success/:id" element={<SuccessView/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}