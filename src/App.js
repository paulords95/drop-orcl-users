import React, { useState } from "react";
import "./App.css";
import TextField from "@material-ui/core/TextField";

import Button from "@material-ui/core/Button";

function App() {
  const [text, setText] = useState("");
  const [error, setError] = useState({
    show: false,
    message: "",
  });

  return (
    <div className="wrap">
      <div className="container">
        <h1 className="title">
          Liberar conexão bloqueada no banco de dados do sistema
        </h1>
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
              },
            }}
            variant="outlined"
            color="primary"
          />
          <form className="btn" method="POST">
            <Button
              onClick={(e) => {
                e.preventDefault();
                if (text.length < 1) {
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
