const { mongoose, Schema } = require("mongoose");

const todoSchema = new mongoose.Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    task: {
      type: String,
      required: true,
    },
    is_complete: {
      type: Boolean,
      default: false,
    },
    completedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

const ToDo = mongoose.model("ToDo", todoSchema);
exports.ToDo = ToDo;
