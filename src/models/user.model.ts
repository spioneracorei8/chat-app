import mongoose, { ObjectId, Schema, Types } from "mongoose";

interface IUser extends Document {
    name: string,
    username: string,
    email: string,
    password: string,
    role: string,
    createdAt: Date,
    updatedAt: Date,
}

interface IUserResponse {
    data?: IUser[],
    message?: string,
    statusCode: number,
    error?: unknown // | string
}

const userSchema = new Schema<IUser>({
    name: { type: String, default: String, required: true },
    username: { type: String, default: String, required: true },
    email: { type: String, default: String, required: true, unique: true },
    password: { type: String, default: String, required: true },
    role: { type: String, default: String },
    createdAt: { type: Date, default: new Date() },
    updatedAt: { type: Date, default: new Date() },
})

const UserModel = mongoose.model<IUser>('userModel', userSchema, 'user');

export { UserModel, IUser, IUserResponse }