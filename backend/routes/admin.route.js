import express from 'express';
const router = express.Router();
import * as adminController from '../controller/admin.controller.js';
import auth from '../middleware/auth.js';
import roleAuth from '../middleware/roleAuth.js';
import upload from '../middleware/upload.js';


router.get('/users', auth, roleAuth(['admin']), adminController.getAllUsers);

router.put('/users/block/:id', auth, roleAuth(['admin']), adminController.blockUser);

router.get('/users/blocked', auth, roleAuth(['admin']), adminController.getBlockedUsers);

router.put('/order/update-status', auth, roleAuth(['admin']), adminController.updateOrderStatus);

router.get('/order/listing', auth, roleAuth(['admin']), adminController.getAllOrders);


router.post('/upload', auth, roleAuth(['admin']), upload.single('image'), adminController.uploadData);

export default router;
