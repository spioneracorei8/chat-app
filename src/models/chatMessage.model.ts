import mongoose, { Schema } from "mongoose";

interface IChatMessage extends Document {
    userId: string,
    name: string,
    role: string,
    message: string,
    createdAt: Date,
    updateAt: Date,
}

const chatMessageSchema = new Schema<IChatMessage>({
    userId: { type: String, default: String, required: true },
    name: { type: String, default: String },
    role: { type: String, default: String, required: true },
    message: { type: String, default: String, required: true },
    createdAt: { type: Date, default: new Date() },
    updateAt: { type: Date, default: new Date() },
})

export default mongoose.model<IChatMessage>('chat-inbox', chatMessageSchema);