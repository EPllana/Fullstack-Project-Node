import express from 'express';
import { sendContactEmail } from '../contact/contact.controller.js';

const router = express.Router();

router.post('/', sendContactEmail);

export default router;
