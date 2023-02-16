import express from 'express'

const router = express.Router()

router.get('/', async (req, res) => {
    res.send('post router')
})

export default router