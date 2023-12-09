import App from "./app";
import 'dotenv/config'

const dbUri: string = process.env.DB_URI || "null";

const app = new App(
    8080,
    dbUri
);

app.start();
app.connectToDatabase();
app.configRoutes();