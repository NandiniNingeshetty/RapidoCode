/*
 * Version		: 0.0.1
 * Description	: Utility to generate export json
 *
 */

var _ = require("lodash");
var exportJson =  function exportJson() {}
// Create swagger file
exportJson.prototype.createSwagger = function(obj, reqProtocol, reqHost) {
    console.log(JSON.stringify(obj));
    var swaggerDefinition = {
        info: {
            title: 'Rapido API',
            version: '1.0.0',
            description: 'Develop new apis',
        },
        schemes: ["https"],
        host: "rapido.dev.ca.com",
        basePath: '/',
        swagger: '2.0'
    };
    var swaggerSpec = swaggerDefinition;
    var paths = {};
    var outerDefinitions = {};
    _.each(obj, function (data, fullPath) {
        var methods = {};
        var parameters = [];

        var definitions = {};
        var properties = {};
        var responses = {};
        var found = [],
            rxp = /{([^}]+)}/g,
            mat;
        var format = /[?]/;
        var formatparam = /[&]/;
        var innerparameters=[];
        /*Test url path contains path parameters */
        while (mat = rxp.exec(fullPath)) {
            found.push(mat[1]);
        }
        if (found != []) {
            _.each(found, function (val, i) {
                if ((typeof val) === "number") {
                    innerparameters.push({ "name": val, "in": "path", "description": "", "required": true, "type": "integer", "format": "int64" });
                }
                else {
                    innerparameters.push({ "name": val, "in": "path", "description": "", "required": true, "type": "string" });

                }

            })
        }


        /*Test url path contains query parameters */
        if (format.test(fullPath) === true) {
            var parametersquery = fullPath.substring(fullPath.indexOf("?") + 1);

            /*Test url path contains multiple query parameters */
            if (formatparam.test(parametersquery) === true) {

                var res = parametersquery.split("&");
                _.each(res, function (v, i) {
                    var resquery = v.split("=");
                    var isnum = /^\d+$/.test(parseInt(resquery[1]));
                    /*Test url path query parameters  datatype*/

                    if (isnum === true) {
                        innerparameters.push({ "name": resquery[0], "in": "query", "description": "", "required": true, "type": "integer", "format": "int64" });

                    } else {
                        innerparameters.push({ "name": resquery[0], "in": "query", "description": "", "required": true, "type": "string" });

                    }


                });
            } else {

                var resquery = parametersquery.split("=");
                var isnum = /^\d+$/.test(parseInt(resquery[1]));
            
                /*Test url path query parameters  datatype*/
                if (isnum === true) {
                    innerparameters.push({ "name": resquery[0], "in": "query", "description": "", "required": true, "type": "integer", "format": "int64" });

                } else {
                    innerparameters.push({ "name": resquery[0], "in": "query", "description": "", "required": true, "type": "string" });

                }

            }
        }
        function isEmpty(obj) {
            for(var key in obj) {
                if(obj.hasOwnProperty(key))
                    return false;
            }
            return true;
        }
        _.each(obj[fullPath], function (innerData, method) {
            _.each(innerData["responses"], function (value, index) {

                if (_.isArray(innerData["responses"])) {
                    
                    //loop and remove dublicates to
                    _.each(value, function (v, i) {
                        
                        var type = typeof value;
                        if (type == "number") {
                            properties[i] = { "type": "integer", "format": "int64" }
                        }
                        else {
                            properties[i] = { "type": type }
                        }
                    });
                } else {
                    var type = typeof value;
                    if (type == "number") {
                        properties[index] = { "type": "integer", "format": "int64" }
                    }
                    else {
                        properties[index] = { "type": type }
                    }
                }

            
            });
           
            if(isEmpty(innerData.request)) {
               
            } else {
                 if(method!="GET")
                 {
                parameters.push({
                "name": "body", "in": "body", "description": "", "required": true,
                schema: {
                $ref: '#/definitions/UsersData'
                   }
                   });
                 }
            }
        if (method ==='GET') {
                methods[method.toLowerCase()] = {
                    "tags": ["api"],
                    "summary": innerData.summary,
                    "description": innerData.summary,
                    "produces": [
                        "application/json",
                        "application/xml"
                    ],
                    "responses": {
                        "200": {
                            "description": "successfull",
                            "schema": {
                                "$ref": "#/definitions/UsersData"
                            }
                        },
                        "400": {
                            "description": "Invalid ID supplied"
                        },
                        "404": {
                            "description": "Pet not found"
                        },
                        "405": {
                            "description": "Validation exception"
                        }
                    }
                
                

                  }
        } else {
             methods[method.toLowerCase()] = {
                    "tags": ["api"],
                    "summary": innerData.summary,
                    "description": innerData.summary,
                    "produces": [
                        "application/json",
                        "application/xml"
                    ],
                    "consumes": [
                        "application/json",
                        "application/xml"
                    ],
                    "parameters": parameters,
                    "responses": {
                        "200": {
                            "description": "successfull",
                            "schema": {
                                "$ref": "#/definitions/UsersData"
                            }
                        },
                        "400": {
                            "description": "Invalid ID supplied"
                        },
                        "404": {
                            "description": "Pet not found"
                        },
                        "405": {
                            "description": "Validation exception"
                        }
                    }
                }

            }
            definitions["type"] = "object";
            definitions["properties"] = properties;
            outerDefinitions["UsersData"] = definitions;
        });
        if(!isEmpty(innerparameters)) {
            methods["parameters"]=innerparameters;

        }
        
        fullPath = fullPath.replace("?" + fullPath.substring(fullPath.indexOf("?") + 1), '');
        paths[fullPath] = methods;
        swaggerSpec["paths"] = paths;
        swaggerSpec["definitions"] = outerDefinitions;
        swaggerSpec["externalDocs"] = {
            "description": "Find out more about Api",
            "url": 'https://jsonplaceholder.typicode.com/'
        }
    });
    return swaggerSpec;
}

// Create postmancollection file
exportJson.prototype.createPostmanCollection = function(obj, baseUrl) {
    var date = new Date();
    var timeStamp = date.getTime();
    var baseId = Math.random().toString(36).slice(2);
    var postmanSpec = {
        "id": baseId,
        "name": "RapidoApi",
        "description": "",
        "orders":[],
        "folders": [],
        "timestamp": timeStamp,
        "owner": "RapidoApi",
        "public": false,
        "requests":[]
    };
    _.each(obj, function(pathData, fullPath) {
        _.each(pathData, function(data, method) {
            var incVal = Math.random().toString(36).slice(2);
            postmanSpec.orders.push(incVal);
            var url="";
            var queryString="";
            if(method.toLowerCase() == "get" || method.toLowerCase() == "delete") {
                _.each (data.request, function (value, index) {
                    queryString += index+"="+value+"&"
                });
                var lastIndex = queryString.lastIndexOf("&");
                queryString = queryString.substring(0, lastIndex);
                url= baseUrl+fullPath+"?"+queryString;
            } else {
                url= baseUrl+fullPath;
            }
            postmanSpec.requests.push({
                "id" : incVal,
                "headers": "Content-Type: application/json",
                "url" : url,
                "pathVariables" : {},
                "preRequestScript" : null,
                "method" : method,
                "collectionId" : baseId,
                "data" : [],
                "dataMode" : "raw",
                "name" : url,
                "description" : data.description ? data.description  :  "",
                "descriptionFormat": "html",
                "time" : timeStamp,
                "version" : 2,
                "responses" : [data.responses],
                "tests" : null,
                "currentHelper": "normal",
                "helperAttributes": {},
                "rawModeData": JSON.stringify(data.request)
            });
        });
    });
    return  postmanSpec;
}

module.exports = exportJson;
