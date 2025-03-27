import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthProvider from "./contexts/contex";
import Login from "./pages/Login";
import Layout from "./pages/Layout";
import Register from "./pages/Register";
import FormForArea from "./pages/FormForAreaProcess";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Layout />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/area' element={<FormForArea />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;