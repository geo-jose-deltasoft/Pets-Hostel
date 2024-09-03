import AuthRouter from './auth.routes';
import BookingRouter from './booking.router';

import express from 'express';


const router = express.Router();

router.use('/auth', AuthRouter);
router.use('/booking', BookingRouter);

export default router
