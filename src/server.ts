import App from "./app.ts";
import 'dotenv/config'

const dbUri: string = process.env.DB_URI as string
// as = assertion
// บังคับให้ typescript มอง value ของ dbUri variable เป็น string โดยไม่มีการตรวจสอบจาก value จริงๆว่า เป็น string หรือไม่

const app = new App(
    8080,
    dbUri
);

app.start();
app.connectToDatabase();
app.configRoutes();