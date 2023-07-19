const { expressjwt: expressjwt } = require('express-jwt');

const secretKey = '8yX9#pK$Jf@3';

const verificarToken = expressjwt({
  secret: secretKey,
  algorithms: ['HS256'],
});

module.exports = verificarToken;
