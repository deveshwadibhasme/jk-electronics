import express from 'express'
import { logInAdmin, logInUser, registerAdmin, registerUser } from '../controller/auth.controller.js'

const router = express.Router()

router.post('/register/admin', registerAdmin)
router.post('/login/admin', logInAdmin)

router.post('/register/user', registerUser)
router.post('/login/user', logInUser)

export default router;

