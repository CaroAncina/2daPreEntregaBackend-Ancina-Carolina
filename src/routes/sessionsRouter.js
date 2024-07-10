import { Router } from 'express';
import passport from 'passport';
import sessionsController from '../controllers/sessionsControllers.js';

const router = Router();

router.post('/register', passport.authenticate('register', { failureRedirect: '/api/sessions/failregister' }), sessionsController.register);
router.get('/failregister', sessionsController.failRegister);
router.post('/login', passport.authenticate('login', { failureRedirect: '/api/sessions/faillogin' }), sessionsController.login);
router.get('/faillogin', sessionsController.failLogin);
router.post('/logout', sessionsController.logout);
router.get('/logout', sessionsController.logout);
router.get('/github', passport.authenticate('github', { scope: ['user:email'] }), sessionsController.github);
router.get('/githubcallback', passport.authenticate('github', { failureRedirect: '/login' }), sessionsController.githubCallback);

export default router;
