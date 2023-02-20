import "./App.scss";
import React from "react";
import Geral from "./componentes/Geral";

function App() {
  const [nome, setNome] = React.useState(null);
  const [hasNome, setHasNome] = React.useState(false);

  React.useEffect(() => {
    const tempNome = window.localStorage.getItem("nome");
    if (tempNome) {
      setNome(tempNome);
      setHasNome(true);
    }
  }, []);

  React.useEffect(() => {
    if (nome !== null && nome !== undefined)
      window.localStorage.setItem("nome", nome);
  }, [nome]);

  function handleHasNome(event) {
    event.preventDefault();
    setHasNome(true);
  }
  return (
    <div className="App">
      {hasNome ? (
        <>
          <p className="nomes">ola {nome}</p> <Geral />{" "}
        </>
      ) : (
        <form>
          <label htmlFor=""></label>
          <input type="text" onChange={({ target }) => setNome(target.value)} />
          <button className="btn" onClick={(e) => handleHasNome(e)}>
            enviar
          </button>
        </form>
      )}
    </div>
  );
}

export default App;
