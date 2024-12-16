const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    images: [
      {
        type: String,
        validate: {
          validator: function (v) {
            // Ensure valid URL format if images are stored as URLs
            return /^https?:\/\/.+\.(jpg|jpeg|png|webp|gif)$/i.test(v);
          },
          message: "Invalid image URL.",
        },
      },
    ],
    typeOfService:[{
        type:String,
        enum:['Call Girls','Transsexual','Massage','Adult Meetings','Male Escorts']
    }],
    state:{
        type:String
    },
    city:{
        type:String
    },
    ethnicity: {
      type: String,
    },
    nationality: {
      type: String,
    },
    breastType: {
      type: String,
      enum: ["Busty", "Natural Boobs"],
    },
    hairType: {
      type: String,
      enum: ["Blond Hair", "Black Hair", "Red Hair", "Brown Hair"],
    },
    bodyType: {
      type: String,
      enum: ["Slim", "Curvy"],
    },
    services: [
      {
        type: String,
        enum: [
          "Oral",
          "Anal",
          "BDSM",
          "Girlfriend Experience",
          "Porn actresses",
          "Body ejaculation",
          "Erotic Massage",
          "Tantric Massage",
          "Fetish",
          "French Kiss",
          "Role Play",
          "Threesome",
          "Sexting",
          "Video call",
        ],
      },
    ],
    attentionTo: [
      {
        type: String,
        enum: ["Men", "Women", "Couples", "Disabled"],
      },
    ],
    placeOfService: [
      {
        type: String,
        enum: [
          "At home",
          "Events and Parties",
          "Hotel/Motel",
          "Clubs",
          "OutCall",
        ],
      },
    ],
    paymentMethods:[{
        type:String,
        enum:['Cash','Credit Card','UPI']
    }],
    perHourRate:{
        type:String
    },
    phoneNo:{
        type:String,
        minLength:10,
        maxLength:15
    }
  },
  {
    timestamps: true, // Automatically adds `createdAt` and `updatedAt`
  }
);

// Add an index to userId for faster queries
postSchema.index({ userId: 1 });

const postModel = mongoose.model("posts", postSchema);

module.exports = postModel;
