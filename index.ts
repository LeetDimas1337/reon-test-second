import express from "express";
import {Request} from "express";
import AmoCRM from "./api/amo";
import {mainLogger} from "./logger"
import config from "./config";

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.listen(config.PORT, () => mainLogger.debug('Server started on', config.PORT))

const amo = new AmoCRM(config.SUB_DOMAIN, config.AUTH_CODE)

amo.getAccessToken().then(() => {

})