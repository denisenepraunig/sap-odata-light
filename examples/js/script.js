var backendURL = "/sap/opu/odata/sap/SEPMRA_PO_APV/";
var purchaseOrdersEntity = "PurchaseOrders";

// show the first 100 results
// order them by the POId
// and select only POId, SupplierName, GrossAmount and CurrencyCode
// we do a select to minimize the network traffic and request only the fields we are displaying
var purchaseOrdersQuery = "?$skip=0&$top=100&$orderby=POId%20asc&$select=POId%2cSupplierName%2cGrossAmount%2cCurrencyCode";

// configure the app
var app = new Vue({
    el: '#app',
    data: {
        purchaseOrder: {},
        purchaseOrders: []
    },
    methods: {
    }
});

function get(entity) {
	
    // Return a new promise.
    return new Promise(function(resolve, reject) {
    	
        // Do the usual XHR stuff
        // because the JavaScript fetch API did not work when debugging in SAP Web IDE... 503?
        var req = new XMLHttpRequest();
        var requestURL = backendURL + entity;
        
        req.open('GET', requestURL);
        
        entity = entity || "$metadata";
        
        // JSON could also be set via URL parameter, but may not always supported: $format=json
        var accept = entity === "$metadata" ? "application/xml" : "application/json";
        
        // the metadata request could accept a higher version
        var maxDataServiceVersion = entity === "$metadata" ? "3.0" : "2.0";
        
        // getting all this OData SAP specific information from 
        // https://github.com/SAP/openui5/blob/master/src/sap.ui.core/src/sap/ui/model/odata/v2/ODataModel.js
        
        // set HEADERS
        req.setRequestHeader("DataServiceVersion", "2.0");
        req.setRequestHeader("MaxDataServiceVersion", maxDataServiceVersion);
        req.setRequestHeader("Accept", accept);
        
        // hard-coded language English
        req.setRequestHeader("Accept-Language", "en");
        
        // I have no idea why those values could be useful
        req.setRequestHeader("sap-cancel-on-close", "true");
        // something to do with a 'soft state'?? WHAT?
        req.setRequestHeader("sap-contextid-accept", "header");

        req.onload = function() {
            // This is called even on 404 etc
            // so check the status
            if (req.status === 200) {
                // Resolve the promise with the response text
                resolve(req.response);
            } else {
                // Otherwise reject with the status text
                // which will hopefully be a meaningful error
                reject(Error(req.statusText));
            }
        };

        // Handle network errors
        req.onerror = function() {
            reject(Error('Network Error'));
        };

        // Make the request
        req.send();
    });
}

function getMetadata() {
	get("$metadata").then(function(response) {
        console.log("metadata loaded");
    }, function(error) {
        console.log('-- Failed loading Metadata! --', error);
    });
}

function getPurchaseOrders() {
    
    get(purchaseOrdersEntity + purchaseOrdersQuery).then(function(response) {

        var responseJSON = "";
        try {
            responseJSON = JSON.parse(response);
        } catch (e) {
            console.log('Error parsing the JSON response: ', e);

            return;
        }

        if (responseJSON) {
    
			console.log("response", responseJSON);
			
			// JSON Format:
			// http://www.odata.org/documentation/odata-version-2-0/json-format/
			
			// entity sets like PurchaseOrders come back in a results array
			if (responseJSON.d && responseJSON.d.results) {
				
				var purchaseOrders = responseJSON.d.results;
				var randomPurchaseOrder = purchaseOrders[Math.floor(Math.random() * purchaseOrders.length)];

				app.purchaseOrder = randomPurchaseOrder;				
				app.purchaseOrders = purchaseOrders;
			}
        }
    }, function(error) {
        console.log('-- Failed loading PurchaseOrders! --', error);
    });
}

getPurchaseOrders();
getMetadata();
