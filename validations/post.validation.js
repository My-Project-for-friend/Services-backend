const { z } =require("zod");

// Define Zod schema for Post validation
const postValidationSchema = z.object({
  userId: z.string().nonempty("User ID is required."), // Expecting a string representation of ObjectId
  images: z
    .array(
      z.string().url("Invalid image URL.").regex(/\.(jpg|jpeg|png|webp|gif)$/i, "Invalid image format.")
    )
    .optional(),
  title: z.string().optional(),
  description: z.string().optional(),
  typeOfService: z
    .array(
      z.enum(["Call Girls", "Transsexual", "Massage", "Adult Meetings", "Male Escorts"])
    )
    .optional(),
  state: z.string().optional(),
  city: z.string().optional(),
  ethnicity: z.string().optional(),
  nationality: z.string().optional(),
  breastType: z.enum(["Busty", "Natural Boobs"]).optional(),
  hairType: z.enum(["Blond Hair", "Black Hair", "Red Hair", "Brown Hair"]).optional(),
  bodyType: z.enum(["Slim", "Curvy"]).optional(),
  services: z
    .array(
      z.enum([
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
      ])
    )
    .optional(),
  attentionTo: z
    .array(
      z.enum(["Men", "Women", "Couples", "Disabled"])
    )
    .optional(),
  placeOfService: z
    .array(
      z.enum([
        "At home",
        "Events and Parties",
        "Hotel/Motel",
        "Clubs",
        "OutCall",
      ])
    )
    .optional(),
  paymentMethods: z
    .array(
      z.enum(["Cash", "Credit Card", "UPI"])
    )
    .optional(),
  perHourRate: z
    .string()
    .optional()
    .refine((value) => !isNaN(Number(value)), {
      message: "Per hour rate must be a valid number.",
    }),
  phoneNo: z
    .string()
    .min(10, "Phone number must be at least 10 digits.")
    .max(15, "Phone number must not exceed 15 digits.")
    .optional(),
});


 module.exports={postValidationSchema};
