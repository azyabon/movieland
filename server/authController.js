const User = require('./models/User');
const Role = require('./models/Role');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const {secret} = require('./config');

let today = new Date();
const dd = String(today.getDate()).padStart(2, '0');
const mm = String(today.getMonth() + 1).padStart(2, '0');
const yyyy = today.getFullYear();
today = mm + '/' + dd + '/' + yyyy;

const generateAccesToken = (id, roles) => {
    const payload = {
        id,
        roles
    }
    return jwt.sign(payload, secret, {expiresIn: "24h"})
}

class authController {

    async registration(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({message: "Ошибка при регистрации", errors})
            }
            const {username, password, email} = req.body
            const candidate_name = await User.findOne({username})
            const candidate_email = await User.findOne({email})
            if (candidate_name || candidate_email) {
                return res.status(400).json({message: 'Пользователь с таким именем уже существует'})
            }
            const hashPassword = bcrypt.hashSync(password, 7);
            const userRole = await Role.findOne({value: "USER"})
            const user = new User({username, password: hashPassword, date: today, email, roles: [userRole.value]})
            await user.save()
            return res.json({message: 'Пользователь успешно зарегистрирован'})
        }catch (e) {
            console.log(e);
            res.status(400).json({message: 'Registration error'})
        }
    }

    async login(req, res) {
        try {
            const {username, password} = req.body
            const user = await User.findOne({username})
            if(!user) {
                return res.status(400).json({message: `Пользователь ${username} не найден`});
            }
            const validPassword = bcrypt.compareSync(password, user.password);
            if (!validPassword) {
                return res.status(400).json({message: `Пароль неверный`});
            }
            const token = generateAccesToken(user._id, user.roles);
            return res.json({token})

        }catch (e) {
            console.log(e);
            res.status(400).json({message: 'Login error'})
        }
    }

    async logout(req, res) {
        return
    }

    async getInfoAboutUser(req, res) {
        return
    }

    async putMovieInUser(req, res) {
        return
    }

    async getUsers(req, res) {
        try {
            const users = await User.find();
            res.json(users)
        } catch (e) {
            console.log(e)
        }
    }
}

module.exports = new authController();