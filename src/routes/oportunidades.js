import { Router } from 'express';
import { postOportunidade, deleteOportunidadeHandler, editOportunidadeHandler } from '../controllers/oportunidadesController.js';
import { updateOportunidade as updateOportunidadeService } from '../services/oportunidadesService.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = Router();

// Temporary debug route: allows updating an oportunidade without auth when DEBUG_SKIP_AUTH=1
if (process.env.DEBUG_SKIP_AUTH === '1') {
	router.post('/__debug_edit', async (req, res) => {
		try {
			console.log('[debug edit route] body=', req.body);
			if (!req.body || !req.body.id) return res.status(400).send('missing id');
			await updateOportunidadeService(req.body.id, req.body);
			return res.status(200).send('ok');
		} catch (err) {
			console.error('debug edit error', err);
			return res.status(500).send('error');
		}
	});
}

router.use(verifyToken);

router.post('/', postOportunidade);

router.post('/:id/delete', deleteOportunidadeHandler);
router.post('/:id/edit', editOportunidadeHandler);

export default router;
