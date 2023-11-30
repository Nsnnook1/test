import { BrowserRouter, Route, Routes } from "react-router-dom";
import Test1 from "../pages/Test1";
import Test2 from "../pages/Test2";
import Home from "../pages/Home";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/test1" element={<Test1 />} />
        <Route path="/test2" element={<Test2 />} />
      </Routes>
    </BrowserRouter>
  )
}