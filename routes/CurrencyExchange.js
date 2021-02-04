var express=require("express");
const { CurrencyExchangeForParticularDate } = require("../controllers/CurrencyExchanges");

var router=express.Router();

router.get("/dateCurrency",CurrencyExchangeForParticularDate);
module.exports=router;