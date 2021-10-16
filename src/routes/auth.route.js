import express from 'express';
import passport from '../utils/passport.util.js';
import * as UserController from '../controllers/user.controller.js';
import { checkAuthentication } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.get("/login",UserController.getLogin);
router.post("/login",passport.authenticate('login',{failureRedirect:'/failLogin'}),UserController.postLogin);
router.get("/failLogin",UserController.getFailLogin)


router.get('/signup',UserController.getsignUp);
router.post('/signup',passport.authenticate('signup',{failureRedirect:'/failLogin'}),UserController.postSignUp);
router.get('/failSignUp', UserController.getFailSignUp);

router.get("/logout",UserController.logout);

router.get('/protected',checkAuthentication,(req,res)=>{
  res.send('<h1>autenticado</h1>')
})

export default router;