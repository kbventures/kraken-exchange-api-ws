const axios = require("axios");
const crypto = require('crypto');
const WebSocket = require('ws');


const Main = async () => {

    //TODO: UPDATE WITH YOUR KEYS :)
    let apiPublicKey = ""
    let apiPrivateKey = ""
    
    try {

        console.log("|=========================================|");
        console.log("|      KRAKEN.COM NODEJS TEST APP         |");
        console.log("|=========================================|");
        console.log();

        /*
        * PRIVATE REST API Examples
        */

        if (1 == 1) {
            let privateResponse = "";
            let privateEndpoint = "ClosedOrders" 
            let privateInputParameters = ""


            privateResponse = await QueryPrivateEndpoint(privateEndpoint, 
                privateInputParameters,
                apiPublicKey,
                apiPrivateKey);
            
            console.log(privateResponse);
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
    * Private REST API Endpoints
    */

    async function QueryPrivateEndpoint(endPointName, 
                                        inputParameters, 
                                        apiPublicKey, 
                                        apiPrivateKey) {
        const baseDomain = "https://api.kraken.com";
        const privatePath = "/0/private/";
        
        const apiEndpointFullURL = baseDomain + privatePath + endPointName + "?" + inputParameters;
        const nonce = Date.now().toString();
        const apiPostBodyData = "nonce=" + nonce + "&" + inputParameters;
       
        const signature = CreateAuthenticationSignature(apiPrivateKey,
                                                        privatePath,
                                                        endPointName,
                                                        nonce,
                                                        apiPostBodyData);
        
        const httpOptions =
        {
            headers: { 'API-Key': apiPublicKey, 'API-Sign': signature }
        };

        let jsonData = await axios.post(apiEndpointFullURL, apiPostBodyData, httpOptions);

        return jsonData.data.result;
    }


    /*
    * Authentication Algorithm
    */

    function CreateAuthenticationSignature(apiPrivateKey, 
                                            apiPath, 
                                            endPointName, 
                                            nonce,
                                            apiPostBodyData){

        const apiPost = nonce + apiPostBodyData;
        const secret = Buffer.from(apiPrivateKey, 'base64');
        const sha256 = crypto.createHash('sha256');
        const hash256 = sha256.update(apiPost).digest('binary');
        const hmac512 = crypto.createHmac('sha512', secret);
        const signatureString = hmac512.update(apiPath + endPointName + hash256, 'binary').digest('base64');
        return signatureString;
    }
};


Main();