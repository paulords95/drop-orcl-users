import React, { useState } from "react";
import "./App.css";
import TextField from "@material-ui/core/TextField";
import Alert from "@material-ui/lab/Alert";

import Button from "@material-ui/core/Button";

function App() {
  const [text, setText] = useState("");
  const [alertCondition, setAlertCondition] = useState("");
  const [error, setError] = useState({
    show: false,
    message: "",
  });

  const ShowAlert = (props) => {
    if (props.condition === "not found") {
      return (
        <Alert variant="filled" severity="error">
          Usuário não encontrado ou não conectado no sistema
        </Alert>
      );
    }
    if (props.condition === "dropped") {
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
        <h1 className="title">
          Liberar conexão bloqueada no banco de dados do sistema
        </h1>
        <div className="alert">
          <ShowAlert condition={alertCondition} />
        </div>
        <div className="text-wrap">
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
              },
            }}
            variant="outlined"
            color="primary"
          />

          <form className="btn" method="POST">
            <Button
              onClick={(e) => {
                e.preventDefault();
                document.querySelector(".alert").style.opacity = 1;
                document.querySelector(".alert").style.height = "100%";
                setAlertCondition("dropped");
                if (text.length < 1) {
                  setAlertCondition("");
                  document.querySelector(".alert").style.opacity = 0;
                  document.querySelector(".alert").style.height = 0;
                  setError({
                    show: true,
                    message: "Informe um usuário",
                  });
                }

                console.log("Enviar");
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
