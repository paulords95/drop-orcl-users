import React, { useState } from "react";
import "./App.css";
import TextField from "@material-ui/core/TextField";
import Alert from "@material-ui/lab/Alert";

import Button from "@material-ui/core/Button";

import api from "./services/api.js";

function App() {
  const [text, setText] = useState("");
  const [alertCondition, setAlertCondition] = useState("");
  const [error, setError] = useState({
    show: false,
    message: "",
  });

  const ShowAlert = (props) => {
    if (props.condition === false) {
      return (
        <Alert variant="filled" severity="error">
          Usuário não encontrado ou não conectado no sistema
        </Alert>
      );
    }
    if (props.condition === true) {
      return (
        <Alert variant="filled" severity="success">
          Usuário desbloqueado no sistema
        </Alert>
      );
    } else {
      return <></>;
    }
  };

  return (
    <div className="wrap">
      <div className="container">
        <h1 className="title">Desbloquear conexão</h1>
        <div className="alert">
          <ShowAlert condition={alertCondition} />
        </div>
        <div className="text-wrap">
          <div
            style={{
              justifyContent: "center",
              width: "max-content",
              margin: "0 auto",
            }}
          >
            <TextField
              id="outlined-number"
              className="input"
              aria-label="primary"
              error={error.show}
              helperText={error.message}
              label="Usuário"
              type="text"
              onChange={(value) => {
                if (value.target.value.length > 1) {
                  setError({
                    show: false,
                    message: "",
                  });
                }
                setText(value.target.value);
              }}
              InputLabelProps={{
                shrink: true,
                style: {
                  color: "white",
                  borderRadius: 15,
                },
              }}
              InputProps={{
                style: {
                  color: "white",
                  textAlign: "center",
                  justifySelf: "center",
                  width: "250px",
                  margin: "0 auto",
                },
              }}
              variant="outlined"
              color="primary"
            />
          </div>

          <form className="btn" method="POST">
            <Button
              onClick={(e) => {
                e.preventDefault();
                const elmAlrt = document.querySelector(".alert").style;
                elmAlrt.opacity = 1;
                setAlertCondition("dropped");
                if (text.length < 1) {
                  setAlertCondition("");
                  elmAlrt.opacity = 0;
                  setError({
                    show: true,
                    message: "Informe um usuário",
                  });
                }
                api
                  .delete(`/connected/sec/${text.toString()}`)
                  .then((res) => {
                    setAlertCondition(res.data[0].status);
                  })
                  .catch((e) => {
                    console.log(e);
                  });
              }}
              variant="contained"
              color="primary"
              type="submit"
            >
              Liberar
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
