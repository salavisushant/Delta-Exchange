const express = require('express');

const router = express.Router();

const User = require('../models/user.model');


router.post("/", async (req, res) => {
    try {
        const user = await User.create(req.body);
        return res.status(201).send(user);
    } catch (err) {
        return res.status(500).send({ status: "Failed", message: e.message })
    }
});



router.get('/', async (req, res) => {
    try {
        const page = +req.query.page;
        const size = +req.query.size;
        const skip = (page - 1) * size;
        const user = await User.find().skip(skip).limit(size).lean().exec();
        const totalPages = Math.ceil((await User.find().countDocuments()) / size);
        return res.status(201).send({ user });
    } catch (e) {
        return res.status(500).json({ status: 'Failed', message: e.message });
    }
});

router.get('/:query', async (req, res) => {
    try {
        const page = +req.query.page;
        const size = +req.query.size;
        const skip = (page - 1) * size;
        const user = await User.find({notes:{$eq: req.params.query}}).skip(skip).limit(size).lean().exec();
        const totalPages = Math.ceil((await User.find().countDocuments()) / size);
        return res.status(201).send({user});
    } catch (e) {
        return res.status(500).json({ status: 'Failed', message: e.message });
    }
});

router.get('/status/:q', async (req, res) => {
    try {
        const user = await User.find({status:{$eq: req.params.q}}).lean().exec();
        return res.status(201).send({user});
    } catch (e) {
        return res.status(500).json({ status: 'Failed', message: e.message });
    }
});

router.delete("/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id).lean().exec();
    return res.status(201).send(user);
  } catch (e) {
    return res.status(500).send({ message: e.message, status: "Failed" });
  }
});



module.exports = router;