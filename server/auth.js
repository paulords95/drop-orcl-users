require("dotenv").config();
const soap = require("soap");

module.exports = async (req, res, next) => {
  const { user, pwd } = req.params;
  try {
    soap.createClient(process.env.SOAP_ENDPOINT, function (err, client) {
      if (client) {
        let response = "";
        client.GetUser(
          {
            user: user.toString(),
            password: pwd.toString(),
            encryption: "0",
            parameters: "",
          },

          function (err, result) {
            if (err) return;
            if (result.result.codUsu) {
              next();
            } else {
              response1 = [
                {
                  msg: "Usuário ou senha incorretos",
                  status: false,
                },
              ];
              res.json(response1);
            }
          }
        );
      }
    });
  } catch (error) {
    console.error(error.message);
    return res.status(403).json(false);
  }
};
