import mongoose, { Schema, Types } from "mongoose";

interface IChatMessage extends Document {
    userId: any,
    name: string,
    role: string,
    message: string,
    createdAt: Date,
    updateAt: Date,
}

interface IChatMessageResponse {
    data?: IChatMessage[],
    message?: string,
    statusCode: number,
    error?: unknown // | string
}

const chatMessageSchema = new Schema<IChatMessage>({
    userId: { type: mongoose.Types.ObjectId, default: mongoose.Types.ObjectId, required: true },
    name: { type: String, default: String },
    role: { type: String, default: String, required: true },
    message: { type: String, default: String, required: true },
    createdAt: { type: Date, default: new Date() },
    updateAt: { type: Date, default: new Date() },
})

const ChatMessageModel = mongoose.model<IChatMessage>('chat-inbox', chatMessageSchema);
export { ChatMessageModel, IChatMessage, IChatMessageResponse }