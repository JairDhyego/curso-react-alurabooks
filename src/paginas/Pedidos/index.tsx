import React, { useEffect, useState } from "react";
import { AbBotao } from "ds-alurabooks";
import { Ipedido } from "./../../interfaces/IPedidos";

import "./Pedidos.css";
import http from "../../http";

const Pedidos = () => {
  const [pedidos, setPedidos] = useState<Ipedido[]>([]);

  useEffect(() => {
    http
      .get<Ipedido[]>("pedidos")
      .then((response) => setPedidos(response.data))
      .catch((err) => console.log(err));
  }, []);

  const excluir = (pedido: Ipedido) => {
    http
      .delete(`pedidos/${pedido.id}`)
      .then(() => {
        setPedidos(pedidos.filter((p) => p.id !== pedido.id));
      })
      .catch((erro) => console.log(erro));
  };

  return (
    <section className="pedidos">
      <h1>Pedidos</h1>

      {pedidos.map((pedido) => (
        <div className="pedido" key={pedido.id}>
          <ul>
            <li>
              Pedido: <strong>{pedido.id}</strong>
            </li>
            <li>
              Data do pedido:
              <strong>{new Date(pedido.data).toLocaleDateString()}</strong>
            </li>
            <li>
              Valor total:
              <strong>
                {Intl.NumberFormat("pt-br", {
                  style: "currency",
                  currency: "BRL",
                }).format(pedido.total)}
              </strong>
            </li>
            <li>
              Entrega realizada em:
              <strong>{new Date(pedido.entrega).toLocaleDateString()}</strong>
            </li>

            <li>
              <button onClick={() => excluir(pedido)}>Excluir</button>
            </li>
          </ul>
          <AbBotao texto="Detalhes" />
        </div>
      ))}
    </section>
  );
};

export default Pedidos;
