import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import BotaoNavegacao from "../BotaoNavegacao";
import ModalCadastroUsuario from "../ModalCadastroUsuario";

import logo from "./assets/logo.png";
import usuario from "./assets/usuario.svg";
import ModalLoginUsuario from "./../ModalLoginUsuario/index";

import "./BarraNavegacao.css";

const BarraNavegacao = () => {
  const token = sessionStorage.getItem("token");
  const navigate = useNavigate();

  const [modalCadastroAberta, setModalCadastroAberta] = useState(false);
  const [modalLoginAberta, setModalLoginAberta] = useState(false);
  const [usuarioEstaLogado, setUsuarioEstaLogado] = useState(token != null);

  const aoEfetuarLogin = () => {
    setUsuarioEstaLogado(true);
    setModalLoginAberta(false);
  };

  const efetuarLogout = () => {
    setUsuarioEstaLogado(false);
    sessionStorage.removeItem("token");
    navigate("/");
  };

  const acoesQuandoDeslogado = (
    <>
      <li>
        <BotaoNavegacao
          texto="Login"
          textoAltSrc="Icone representando um usuário"
          imagemSrc={usuario}
          onClick={() => setModalLoginAberta(true)}
        />
        <ModalLoginUsuario
          aberta={modalLoginAberta}
          aoFechar={() => setModalLoginAberta(false)}
          aoEfetuarLogin={aoEfetuarLogin}
        />
      </li>
      <li>
        <BotaoNavegacao
          texto="Cadastrar-se"
          textoAltSrc="Icone representando um usuário"
          imagemSrc={usuario}
          onClick={() => setModalCadastroAberta(true)}
        />
        <ModalCadastroUsuario
          aberto={modalCadastroAberta}
          aoFechar={() => setModalCadastroAberta(false)}
        />
      </li>
    </>
  );

  const acoesQuandoLogado = (
    <>
      <li>
        <Link to="/minha-conta/pedidos">Minha Conta</Link>
      </li>

      <li>
        <BotaoNavegacao
          texto="Logout"
          textoAltSrc="Icone representando um usuário"
          imagemSrc={usuario}
          onClick={efetuarLogout}
        />
      </li>
    </>
  );

  return (
    <nav className="ab-navbar">
      <h1 className="logo">
        <Link to="/">
          <img className="logo" src={logo} alt="Logo da AluraBooks" />
        </Link>
      </h1>
      <ul className="navegacao">
        <li>
          <a href="#!">Categorias</a>
          <ul className="submenu">
            <li>
              <Link to="/">Frontend</Link>
            </li>
            <li>
              <Link to="/">Programação</Link>
            </li>
            <li>
              <Link to="/">Infraestrutura</Link>
            </li>
            <li>
              <Link to="/">Business</Link>
            </li>
            <li>
              <Link to="/">Design e UX</Link>
            </li>
          </ul>
        </li>
      </ul>
      <ul className="acoes">
        {usuarioEstaLogado ? acoesQuandoLogado : acoesQuandoDeslogado}
      </ul>
    </nav>
  );
};
export default BarraNavegacao;
