import { Router } from 'express';
import { automateRecordVerification } from '../controllers/automationController.ts';

const router = Router();

/**
 * Endpoint for automating the record verification process
 */
router.post('/automation', automateRecordVerification);

export default router; 