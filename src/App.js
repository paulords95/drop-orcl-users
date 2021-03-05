import React, { useState } from "react";
import "./App.css";
import TextField from "@material-ui/core/TextField";
import Alert from "@material-ui/lab/Alert";
import CircularProgress from '@material-ui/core/CircularProgress';

import Button from "@material-ui/core/Button";

import api from "./services/api.js";
import lockIcon from "./lock-svg.svg";

function App() {
  const [text, setText] = useState("");
  const [load, setLoad] = useState(false)
  const [pwd, setPwd] = useState("");
  const [alertCondition, setAlertCondition] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [error, setError] = useState({
    show: false,
    message: "",
  });

  const [errorPwd, setErrorPwd] = useState({
    show: false,
    message: "",
  });

  const ShowAlert = (props) => {
    if (
      props.condition === false &&
      props.message === "Usuário não está bloqueado no sistema"
    ) {
      return (
        <Alert variant="filled" severity="warning">
          {props.message}
        </Alert>
      );
    } else if (props.condition === false && props.message.length > 1) {
      return (
        <Alert variant="filled" severity="error">
          {props.message}
        </Alert>
      );
    } else if (props.condition === true && props.message.length > 1) {
      return (
        <Alert variant="filled" severity="success">
          {props.message}
        </Alert>
      );
    } 
    else {
      return <></>;
    }
  };

  return (
    <div className="wrap">
      <div className="container">
        <div className="text-wrap">
          <div
            style={{
              justifyContent: "center",
              margin: "0 auto",
            }}
          >
            <img src={lockIcon} alt="lock" className="lock-icon" />
            <h1 className="title">Desbloquear conexão</h1>
            <div style={{ height: 0 }} >{load ? <CircularProgress /> : <></>}</div>
            <div className="alert">
              {load ? <></> : <ShowAlert condition={alertCondition} message={alertMessage} />}
           
            </div>
            
            <div className="inputItem">
              <TextField
                id="outlined-number"
                className="input"
                aria-label="primary"
                error={error.show}
                helperText={error.message}
                label="Usuário"
                type="text"
                onChange={(value) => {
                  setAlertCondition('');
                  setAlertMessage("");
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
                    color: "#35363B",
                    borderRadius: 15,
                  },
                }}
                InputProps={{
                  style: {
                    color: "#35363B",
                    textAlign: "center",
                    justifySelf: "center",
                    width: "200px",
                  },
                }}
                variant="outlined"
                color="primary"
              />
            </div>
            <div className="inputItem">
              <TextField
                id="outlined-number2"
                className="input"
                aria-label="primary"
                error={errorPwd.show}
                helperText={errorPwd.message}
                label="Senha"
                type="password"
                onChange={(value) => {
                  setAlertCondition('');
                  setAlertMessage("");
                  if (value.target.value.length > 1) {
                    setErrorPwd({
                      show: false,
                      message: "",
                    });
                  }
                  setPwd(value.target.value);
                }}
                InputLabelProps={{
                  shrink: true,
                  style: {
                    color: "#35363B",
                    borderRadius: 15,
                    textAlign: "center",
                  },
                }}
                InputProps={{
                  style: {
                    color: "#35363B",
                    textAlign: "center",
                    justifySelf: "center",
                    width: "200px",
                  },
                }}
                variant="outlined"
                color="primary"
              />
            </div>
            <form className="btn" method="DELETE">
              <Button
                onClick={(e) => {
                  e.preventDefault();
                
                  const elmAlrt = document.querySelector(".alert").style;
                  if (text.length < 1 && pwd.length < 1) {
                    setAlertCondition(false);
                    setAlertMessage("Preencha seu usuário e senha");
                    elmAlrt.opacity = 1;
                    setError({
                      show: true,
                      message: "",
                    });
                    setErrorPwd({
                      show: true,
                      message: "",
                    });
                  } else if (text.length < 1) {
                    setAlertCondition(false);
                    setError({
                      show: true,
                      message: "Preencha seu usuário",
                    });
                    setAlertMessage("");
                  } else if (pwd.length < 1) {
                    setAlertCondition("");

                    setErrorPwd({
                      show: true,
                      message: "Preencha sua senha",
                    });
                    setAlertMessage("");
                  } else {
                    setLoad(true)
                    api
                      .delete(
                        `/connected/sec/${text.toString()}/${pwd.toString()}`
                      )
                      .then((res) => {
                        setAlertMessage(res.data[0].msg);
                        setAlertCondition(res.data[0].status);
                        setLoad(false)
                        elmAlrt.opacity = 1;
                      })
                      .catch((e) => {
                        setAlertMessage("Erro durante o acesso ao servidor");
                        setAlertCondition(false);
                        setLoad(false)
                        elmAlrt.opacity = 1;
                      });
                  }
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
    </div>
  );
}

export default App;
