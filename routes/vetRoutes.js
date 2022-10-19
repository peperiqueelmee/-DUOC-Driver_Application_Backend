import { Router } from 'express';
import { register, profile, confirm, autenticate, forgotPassword, checkToken, newPassword, updateProfile, updatePassword } from '../controllers/vetController.js';
import checkAuth from '../middlewares/autMiddleware.js';



const router = Router();

//Public Area
router.post('/', register);
router.get('/confirmar/:token', confirm);
router.post('/login', autenticate);
router.post('/olvide-password', forgotPassword);
router.route('/olvide-password/:token').get(checkToken).post(newPassword);

//Private Area
router.get('/perfil', checkAuth, profile);
router.put('/perfil/:id', checkAuth, updateProfile);
router.put('/actualizar-password', checkAuth, updatePassword);



export default router;
