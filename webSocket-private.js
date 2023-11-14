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
        * PRIVATE WEBSOCKET Examples
        */

        if (1 == 1) {

            let privateWebSocketURL = "wss://ws-auth.kraken.com/";

            //GET THE WEBSOCKET TOKEN FORM THE JSON RESPONSE 
            let webSocketToken = await QueryPrivateEndpoint("GetWebSocketsToken", "", apiPublicKey, apiPrivateKey);
            webSocketToken = webSocketToken['token'];

            /*
            *MORE PRIVATE WEBSOCKET EXAMPLES

            let privateWebSocketSubscriptionMsg = `{ "event": "subscribe", "subscription": { "name": "openOrders", "token": "${webSocketToken}"}}`;
            let privateWebSocketSubscriptionMsg = `{ "event": "subscribe", "subscription": { "name": "balances", "token": "${webSocketToken}"}}`;
            let privateWebSocketSubscriptionMsg = `{"event":"addOrder","reqid":1234,"ordertype":"limit","pair":"XBT/EUR","token":"${webSocketToken}","type":"buy","volume":"1", "price":"1.00"}`;
            */

            //REPLACE PLACEHOLDER WITH TOKEN
            privateWebSocketSubscriptionMsg = `{ "event": "subscribe", "subscription": { "name": "ownTrades", "token": "${webSocketToken}"}}`;

            await OpenAndStreamWebSocketSubscription(privateWebSocketURL, privateWebSocketSubscriptionMsg);
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
    * WebSocket API
    */

    async function OpenAndStreamWebSocketSubscription(connectionURL, webSocketSubscription) {
        try {
            const webSocketClient = new WebSocket(connectionURL);

            webSocketClient.on('open', function open() {
                webSocketClient.send(webSocketSubscription);
            });

            webSocketClient.on('message', function incoming(wsMsg) {
                var d = new Date();
                var msgTime = d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
                console.log(msgTime + ": " + wsMsg);
            });

            webSocketClient.on('close', function close() {
                console.log("|==============================================|");
                console.log("|     END OF PROGRAM - HAVE A GOOD DAY :)      |");
                console.log("|==============================================|");
                console.log("\n");
            });

        }
        catch (e) {
            console.log();
            console.log("AN EXCEPTION OCCURED :(");
            console.log(e);
        }
    }
};


Main();