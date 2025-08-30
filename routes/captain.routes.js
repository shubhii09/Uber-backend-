const captainController = require('../controllers/captain.controller');
const express = require('express');
const router = express.Router();    
const {body} = require('express-validator');
const authMiddleware = require('../middlewares/auth.middleware');


router.post('/register',[
    body('email').isEmail().withMessage('Invalid Email'),
    body('fullname.firstname').isLength({min: 3}).withMessage('First name must be at least 3 character'),
    body('password').isLength({min: 6}).withMessage('Password must be at least 6 character long'),
    body('vechile.color').isLength({min:3}).withMessage('color must be at leasgt 3 character long'),
    body('vechile.plate').isLength({min:3}).withMessage('plate must be at least 3 character'),
    body('vechile.capacity').isInt({min:1}).withMessage('Capscity must be at least 1'),
    body('vechile.vechileType').isIn(('car','motorcycle','auto')).withMessage('invalid vechile type')
],
    captainController.registerCaptain
)

router.post('/login',[
    body('email').isEmail().withMessage('Invalid Email'),
    body('password').isLength({min: 6}).withMessage('Password must be at least 6 character long')
],
    captainController.loginCaptain
)


router.get('/profile', authMiddleware.authCaptain , captainController.getCaptainProfile);

router.get('logout', authMiddleware.authCaptain , captainController.logoutCaptain);

module.exports = router;
  

