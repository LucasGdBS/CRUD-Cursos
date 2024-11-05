import { BrowserRouter, Routes, Route } from "react-router-dom";
import Matricula from "./pages/Matricula";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
		<Route path="/" element={<Matricula/>} />
	  </Routes>
    </BrowserRouter>
  );
}
