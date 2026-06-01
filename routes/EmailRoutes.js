const express = require('express')
const router = express.Router()
const EmailController = require('../controllers/EmailController')
const rateLimit = require('express-rate-limit')

const emailLimiter = rateLimit({
  windowMs: 60 * 1000, 
  max: 3,               
  standardHeaders: true, 
  legacyHeaders: false,  
  message: {
    message: 'Você atingiu o limite de 3 envios por minuto. Tente novamente em breve.'
  }
})

router.post('/send_referral_guide', emailLimiter, EmailController.sendReferralGuide)
router.post('/send_request_quote', emailLimiter, EmailController.sendRequestQuote)

module.exports = router