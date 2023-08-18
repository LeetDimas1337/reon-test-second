import express from "express";
import AmoCRM from "./api/amo";
import {mainLogger} from "./logger"
import config from "./config";

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));


const amo = new AmoCRM(config.SUB_DOMAIN, config.AUTH_CODE)

amo.getAccessToken().then(() => {
    app.listen(config.PORT, () => {
        mainLogger.debug('Server started on', config.PORT)
    })

}).catch((err: Error) => console.log(err.message))