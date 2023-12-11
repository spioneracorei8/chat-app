import App from "./app.ts";
import 'dotenv/config'

const dbUri = process.env.DB_URI as string

const app = new App(
    8080,
    dbUri 
);

app.start();
app.connectToDatabase();
app.configRoutes();