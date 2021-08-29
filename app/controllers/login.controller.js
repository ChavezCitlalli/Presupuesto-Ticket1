const LoginModels = require("../models/login.models");

const loginModels = new LoginModels();


class LoginController {

    async login({data}) {
        const { email, pass } = data;
        try{
            const userAndToken = await loginModels.login({ email, pass });
            return (userAndToken);
        } catch(err){
            console.log(err);
            return res.status(500).json({
                msg: 'Hable con el aministrador'
            });
        }
    }




};

module.exports = LoginController;
