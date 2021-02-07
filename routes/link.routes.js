const {Router} = require('express');
const config = require("config");
const shortId = require("shortid");

const Link = require('../models/link');
const auth = require('../middleware/auth.middleware');


router = Router();

router.post('/generate', auth, async (req, res) => {
    try {
        const baseUrl = config.get('baseURL');
        const {from} = req.body;
    
        const code = shortId.generate();

        const exsiting = await Link.findOne({ from });

        if(exsiting)
        {
            return res.json({ link: exsiting })
        }

        const to = baseUrl + '/t/' + code;

        const link = new Link({
            owner: req.user.userId,
            from,
            to,
            code
        })

        await link.save();

        res.status(201).json({ link });

    } catch (error) {
        res.status(500).json({message: 'Что-то пошло не так попробуйте снова...'})
    }
})

router.get('/', auth, async (req, res) => {
    //получить список ссылок
    try {
        const links = await Link.find({ owner: req.user.userId })
        res.json(links);
    } catch (error) {
        res.status(500).json({message: 'Что-то пошло не так попробуйте снова...'})
    }
})

router.get('/:id', auth,  async (req, res) => {
    try {
 
        const link = await Link.findById(req.params.id)
        res.json(link);

    } catch (error) {
        res.status(500).json({message: 'Что-то пошло не так попробуйте снова...'})
    }
})

module.exports = router;