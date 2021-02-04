var express=require("express");

const { CurrencyExchangeAvgForDateRange } = require("../controllers/CurrencyExchanges");

var router=express.Router();

router.get("/dateCurrency",CurrencyExchangeAvgForDateRange);
module.exports=router;