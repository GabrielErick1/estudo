import React from "react";
import Input from "./Input";

const perguntas = [
  {
    pergunta: "Qual método é utilizado para criar componentes?",
    options: [
      "React.makeComponent()",
      "React.createComponent()",
      "React.createElement()",
    ],
    resposta: "React.createElement()",
    id: "p1",
  },
  {
    pergunta: "Como importamos um componente externo?",
    options: [
      'import Component from "./Component"',
      'require("./Component")',
      'import "./Component"',
    ],
    resposta: 'import Component from "./Component"',
    id: "p2",
  },
  {
    pergunta: "Qual hook não é nativo?",
    options: ["useEffect()", "useFetch()", "useCallback()"],
    resposta: "useFetch()",
    id: "p3",
  },
  {
    pergunta: "Qual palavra deve ser utilizada para criarmos um hook?",
    options: ["set", "get", "use"],
    resposta: "use",
    id: "p4",
  },
];
const Geral = () => {
  const [respostas, setRespostas] = React.useState({
    p1: "",
    p2: "",
    p3: "",
    p4: "",
  });
  const [slid, setSlid] = React.useState(0);
  const [acertos, setAcertos] = React.useState("");
  function handleChange({ target }) {
    setRespostas({ ...respostas, [target.id]: target.value });
  }
  function getCorrectAsw() {
    const listas = perguntas.map(({ pergunta, resposta, id }, index) => (
      <div
        className={` resposta ${
          respostas[id] === resposta ? "certa" : "incorreta"
        }`}
        key={index}
      >
        <p className="pergunta">{pergunta}</p>
        <p>{` voce: ${respostas[id]} correta: ${resposta}`}</p>
      </div>
    ));

    return listas;
  }
  function acertou() {
    const corretas = perguntas.filter(
      ({ resposta, id }) => respostas[id] === resposta
    );
    setAcertos(
      `parabens voce acertou ${corretas.length} resposta  de ${perguntas.length} perguntas`
    );
  }

  function handleClick() {
    if (slid < perguntas.length - 1) {
      setSlid(slid + 1);
    } else {
      setSlid(slid + 1);
      acertou();
    }
  }
  return (
    <form onSubmit={(event) => event.preventDefault()}>
      {perguntas.map((pergunta, index) => (
        <Input
          key={pergunta.id}
          active={slid === index}
          {...pergunta}
          onChange={handleChange}
          value={respostas[pergunta.id]}
        />
      ))}

      {acertos ? (
        <>
          <p className="acertos1">{acertos}</p>
          {getCorrectAsw()}
        </>
      ) : (
        <button className="btn" onClick={handleClick}>
          proximo
        </button>
      )}
    </form>
  );
};

export default Geral;
