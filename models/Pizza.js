const { Schema, model, Types } = require("mongoose");
const dateFormat = require("../utils/dateFormat")

const PizzaSchema = new Schema(
  {
    pizzaName: {
      type: String,
      required: [true, "You need to provide a pizza name!"],
      trim: true
    },
    createdBy: {
      type: String,
      required: true,
      trim: true
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtVal) => dateFormat(createdAtVal)
    },
    size: {
      type: String,
      required: true,
      enum: ["Personal", "Small", "Medium", "Large", "Extra Large"],
      default: "Large",
    },
    toppings: [],
    comments: [
      {
        type: Types.ObjectId,
        ref: "Comment",
      }
    ]
  },
  {
    toJSON: {
      virtuals: true,
      getters: true
    },
    id: false,
    bufferCommands: false,
    autoCreate: false
  }
);

// get total count of comments and replies on retrieval
PizzaSchema.virtual("commentCount").get(function () {
  return this.comments.reduce((total, comment) => total + comment.replies.length + 1, 0);
});

// create the Pizza model using the PizzaSchema
const Pizza = model("Pizza", PizzaSchema);

await Pizza.createCollection();

module.exports = Pizza;
