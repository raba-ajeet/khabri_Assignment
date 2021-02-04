var fetch=require("node-fetch");
exports.CurrencyExchangeForParticularDate = async (req,res) => {
    let start_date=new Date(req.body.startDate);
    let end_date=new Date(req.body.endDate);
    let minz_date=new Date("2000-01-01");
    let maxz_date=new Date();
    // date validations 
    if( start_date.toString()==="Invalid Date"  || end_date.toString()==="Invalid Date" || minz_date>start_date || maxz_date<end_date){
        console.log("error in dates");
        return res.status(400).json({
            "error":"Dates are not valid"
        })
    }
    // currency array empty checking 
    if(!req.body.currencies || Object.keys(req.body.currencies).length===0){
        return res.status(400).json({
            "error":"please select atleast one currencey"
        })
    }

    // fetching of data from startDate to endDate    
    const response = await fetch(`https://api.exchangeratesapi.io/history?start_at=${req.body.startDate}&end_at=${req.body.endDate}`);
    const jsonresp = await response.json();
    let rates=jsonresp.rates;

    // going through response of fetch request
    let allCurrenciesSum ={};
    let size=0;
    let particularDate;
    for(particularDate in rates){
        size++;
        let currency;
        for(currency in rates[particularDate]){
            // console.log(rates[key][key1]);
            if(allCurrenciesSum[currency]){
                allCurrenciesSum[currency]+=rates[particularDate][currency];
            }
            else allCurrenciesSum[currency]=rates[particularDate][currency];
        }
    }
    let selectedCurriences={};
    let selectedCurrency;
    for(key in allCurrenciesSum){
        let ok=0;
        for(selectedCurrency of req.body.currencies){
            if(selectedCurrency===key) ok=1;
        }
        if(ok){
            selectedCurriences[key]=allCurrenciesSum[key]/size;
        }
    }
    for(selectedCurrency of req.body.currencies){
        if(!selectedCurriences[selectedCurrency]) selectedCurriences[selectedCurrency]="not valid currency";
    }
    return res.status(200).json(selectedCurriences);

} 