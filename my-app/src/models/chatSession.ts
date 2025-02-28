import mongoose from "mongoose";

const ChatSessionSchema = new mongoose.Schema(
  {
    sessionId: {
      type: String,
      required: true,
      unique: true,  
    },
    messages: [
      {
        role: {
          type: String,
          enum: ["user", "ai"], 
          required: true,
        },
        content: {
          type: String,
          required: true,
        },
        timestamp: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.models.ChatSession ||
mongoose.model("ChatSession", ChatSessionSchema);
