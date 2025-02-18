import { Route, Routes } from "react-router-dom";
import Home from "paginas/Home";
import PaginaBase from "paginas/PaginaBase";
import AreaLogada from "paginas/AreaLogada";
import Pedidos from "paginas/Pedidos";

const Rotas = () => {
  return (
    <Routes>
      <Route path="/" element={<PaginaBase />}>
        <Route index element={<Home />} />
        <Route path="/minha-conta" element={<AreaLogada />}>
          <Route path="pedidos" element={<Pedidos />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default Rotas;
