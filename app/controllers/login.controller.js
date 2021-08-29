const LoginModels = require("../models/login.models");

const loginModels = new LoginModels();


class LoginController {

    async login(req,res) {
        const { email, pass } =req.body; 
        try{
            const userAndToken = await loginModels.login({ email, pass });
            res.send(userAndToken)
        } catch(err){
            console.log(err);
            return res.status(500).json({
                msg: 'Hable con el aministrador'
            });
        }
    }




};

module.exports = LoginController;
