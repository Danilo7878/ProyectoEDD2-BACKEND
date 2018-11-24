const jwt = require('jsonwebtoken');

module.exports = (req, res, next) =>{
    try{
        const token =  req.headers.authorization.split(" ")[0];
        console.log(token);
        const decoded = jwt.verify(token, "este-es-un-token");
        req.userData =  decoded;
        next();
    }catch(err){
        res.status(401).json({
            error: "Autenticacion fallida"
        });
    }
}