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
        * PUBLIC WEBSOCKET Examples
        */

        if (1 == 1) {

            let publicWebSocketURL = "wss://ws.kraken.com/";
            let publicWebSocketSubscriptionMsg = '{ "event":"subscribe", "subscription":{"name":"trade"},"pair":["XBT/USD"] }';

            /*
            *MORE PUBLIC WEBSOCKET EXAMPLES
            
            let publicWebSocketSubscriptionMsg = "{ "event": "subscribe", "subscription": { "interval": 1440, "name": "ohlc"}, "pair": [ "XBT/EUR"]}";
            let publicWebSocketSubscriptionMsg = "{ "event": "subscribe", "subscription": { "name": "spread"}, "pair": [ "XBT/EUR","ETH/USD" ]}";
            */

            await OpenAndStreamWebSocketSubscription(publicWebSocketURL, publicWebSocketSubscriptionMsg);
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