import express from "express"
import { DateTime } from "luxon";
import swaggerJSDoc from "swagger-jsdoc"
import swaggerUI from "swagger-ui-express"

const app = express()
app.use(express.json())

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
 * /timestamp:
 *   get:
*     responses:
 *       200:
 *         description: Returns the current time and date in UTC.
 */
app.get("/timestamp", (req, res) => {
    const currentDateTime = DateTime.now().toISO();
    res.send({ currentDateTime })
})

/**
 * @openapi
 * /timestampFromOtherServer:
 *   get:
 *     responses:
 *       200:
 *         description: Returns the current time and date in UTC from the date-authority.
 */
app.get("/timestampFromOtherServer", async (req, res) => {
    // the other server (which is in python_server folder) should be also running
    const getDateFromOtherServer = await fetch('http://127.0.0.1:8000/timestamp');
    const responseInJson = await getDateFromOtherServer.json();
    console.log(responseInJson);
    res.send({ reponse: responseInJson })
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log("Server is running on port ", PORT)
})