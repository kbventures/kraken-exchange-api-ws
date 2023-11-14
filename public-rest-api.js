const axios = require("axios");
const crypto = require('crypto');
const WebSocket = require('ws');


const Main = async () => {
    
    try {

        console.log("|=========================================|");
        console.log("|      KRAKEN.COM NODEJS TEST APP         |");
        console.log("|=========================================|");
        console.log();


        /*
        * PUBLIC REST API Examples
        */

        if (1 == 1) {
            let publicResponse = "";

            let publicEndpoint = "SystemStatus";
            let publicInputParameters = "";

            
            // *MORE PUBLIC REST EXAMPLES
 
            // let publicEndpoint = "AssetPairs";
            // let publicInputParameters = "pair=ethusd,xbtusd";
 
            // let publicEndpoint = "Ticker";
            // let publicInputParameters = "pair=ethusd";
 
            // let publicEndpoint = "Trades";
            // let publicInputParameters = "pair=ethusd&since=0";
            

            publicResponse = await QueryPublicEndpoint(publicEndpoint, publicInputParameters);
            console.log(publicResponse);

        }

        console.log("|=======================================|");
        console.log("| END OF PROGRAM - HAVE A GOOD DAY :)   |");
        console.log("|=======================================|");
        console.log("\n");

    }
    catch (e) {
        console.log();
        console.log("AN EXCEPTION OCCURED :(");
        console.log(e);
    }


    /*
    * Public REST API Endpoints
    */

    async function QueryPublicEndpoint(endPointName, inputParameters) {
        let jsonData;
        const baseDomain = "https://api.kraken.com";
        const publicPath = "/0/public/";
        const apiEndpointFullURL = baseDomain + publicPath + endPointName + "?" + inputParameters;
        
        jsonData = await axios.get(apiEndpointFullURL);
        return jsonData.data.result;
    }
};


Main();