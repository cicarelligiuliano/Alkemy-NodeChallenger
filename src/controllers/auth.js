const bcryptjs = require('bcryptjs');
const { User } = require('../db');
const { response, request } = require('express');
const { generarJWT } = require('../helpers/generar-jwt');

const login = async (req = request, res = response) => {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email: email.toLowerCase() } });

    if (!user) return res.status(404).json({ ok: false, msg: 'Wrong user or password' });

    const validPassword = bcryptjs.compareSync(password, user.password);

    if (!validPassword) {
        return res.status(404).json({ ok: false, msg: 'Wrong user or password' });
    } else {
        const token = await generarJWT(user.id);
        res.json({ ok: true, token });
    }
};

const register = async (req = request, res = response) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ where: { email: email.toLowerCase() } });

        if (user) return res.status(404).json({ ok: false, msg: 'Email in use' });

        //Hasheo de contraseña
        const salt = bcryptjs.genSaltSync();
        const hashedPassword = bcryptjs.hashSync(password, salt);

        const newUser = await User.create({ email: email.toLowerCase(), password: hashedPassword });

        res.json({ ok: true, msg: 'User created' });
    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    login,
    register,
};
