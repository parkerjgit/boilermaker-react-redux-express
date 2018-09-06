const router = require('express').Router()
// const localRouter = require('./local')
//const googleRouter = require('./google')

router.use('/local', require('./local'))
//router.use('/google', googleRouter)

module.exports = router
