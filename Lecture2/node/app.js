const express = require("express") // when using module
const path = require('path');
const parse = require("./parse.js");
const swaggerJSDoc = require("swagger-jsdoc")
const swaggerUI = require("swagger-ui-express")

const app = express();

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Users API',
            version: '0.0.1',
        },
    },
    apis: ['./app.js'],
};

const openapiSpecification = swaggerJSDoc(options);
// console.log(openapiSpecification)

app.use("/docs", swaggerUI.serve, swaggerUI.setup(openapiSpecification))


/**
 * @openapi
 * /getJson:
 *   get:
*     responses:
 *       200:
 *         description: Example of Json file.
 */
app.get("/getJson", (req, res) => {
    const data = parse.parse_json("./files/file.json");
    res.json({ data })
})

/**
 * @openapi
 * /getXml:
 *   get:
*     responses:
 *       200:
 *         description: Example of XML file that contains food .
 */
app.get("/getXml", (req, res) => {

    const data = parse.parse_xml("./files/file.xml");
    res.json({ data })
})

app.listen(3000, () => {
    console.log("Server is running on ", 3000)
})