import mongoose, { ObjectId, Schema, Types } from "mongoose";

interface IUser extends Document {
    _id: Schema.Types.ObjectId,
    name: string,
    username: string,
    email: string,
    password: string,
    role: string,
    createdAt: Date,
    updatedAt: Date,
}

const userSchema = new Schema<IUser>({
    _id: Schema.Types.ObjectId,
    name: { type: String, default: String, required: true },
    username: { type: String, default: String, required: true },
    email: { type: String, default: String, required: true, unique: true },
    password: { type: String, default: String, required: true },
    role: { type: String, default: String },
    createdAt: { type: Date, default: new Date() },
    updatedAt: { type: Date, default: new Date() },
})

const UserModel = mongoose.model<IUser>('user', userSchema);

export { UserModel, IUser }