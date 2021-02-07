const {Router} = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');
const {check, validationResult} = require('express-validator');
const router = Router();

const User = require('../models/user');

// /api/auth
router.post(
    '/register', 
    //middleware for params request with data authentication
    [
        check('email', 'Email не верен, введите другой или повторите попытку.').normalizeEmail().isEmail(),
        //password must been
        check('password', 'Пароль должен иметь минимум 6 символов.')
            .isLength({min: 6})
    ],
    async (req, res) => {

        try {
            const errors = validationResult(req);
            //if params req has errors
            if(!errors.isEmpty())
            { 
                res.status(400).json({
                    errors: errors.array(),
                    message: 'Ввели некорректные данные'
                })
                return;
            }
            //from frontend
            const {email, password} = req.body;
            //through model i connect with database !{email} === {email: email}!
            const candidate = await User.findOne({email});

            if(candidate)
            {
                res.status(400).json({message: 'Email уже занят, измените его на другой...'})
            }
            //set new user to db

            //hash password
            const hash_password = await bcrypt.hash(password, 15);

            const user = new User({ email, password: hash_password});

            await user.save();

            res.status(201).json({message: 'Пользователь создан'});
            return;

        } catch (error) {
            console.log(error);
            res.status(500).json({message: 'Что-то пошло не так попробуйте снова...'})
            return;
        }
    }
);

router.post(
    '/login', 
    [
        check('email', 'Email не верен, введите другой или повторите попытку.').isEmail(),
        check('password', 'Пароль должен иметь минимум 6 символов.')
            .isLength({min: 6})
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);
            //if params req has errors
            if(!errors.isEmpty())
            {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Ввели некорректные данные при входе в систему'
                })
            }
            //from frontend
            const {email, password} = req.body;
            //check user of db
            const user = await User.findOne({email});

            if(!user)
            {
                res.status(400).json({ message: 'Ввели некорректные данные при входе в систему' });
            }
            //compare password req.params and user model with property passw 
            const isMatch = bcrypt.compare(password, user.password);

            if(!isMatch)
            {
                res.status(400).json({ message: 'Пользователь не найден' });
            }

            //Validation with JWT
            const token = jwt.sign(
                {userId : user.id},
                config.get("jwt_secret"),
                { expiresIn: '1h' },
            );

            res.send({token, userId: user.id});

        } catch (error) {
            res.status(500).json({message: 'Что-то пошло не так попробуйте снова...'})
        }
    }
);

module.exports = router;