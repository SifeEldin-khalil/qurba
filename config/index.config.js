const ENV               = process.env.ENV || "development"
const PORT              = process.env.PORT || 8080;
const DOMAIN            = process.env.DOMAIN || `http://localhost:${PORT}`
const MONGO_URI         = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/qurba";
const SECRET_KEY        = process.env.SECRET_KEY || 'gcdhwcvuwvckbw532wk83e865w02uy442t78t24';

const config = {}

config.dotEnv = {
  ENV,
  PORT,
  DOMAIN,
  SECRET_KEY,
  MONGO_URI
};

module.exports = config;
