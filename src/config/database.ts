import mongoose, { ConnectOptions } from "mongoose"

class Database {
    public mongoose: mongoose.Mongoose | undefined;
    private dbUri: string;

    public constructor(dbUri: string,) {
        this.dbUri = dbUri;
    }

    public async connect(): Promise<void> {
        this.mongoose = await mongoose.connect(this.dbUri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        } as ConnectOptions);
        console.log("Connected to MongoDB Atlas successfully!");
    }

}

export default Database;
