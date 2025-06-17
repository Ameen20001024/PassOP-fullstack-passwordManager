import mongoose, {Schema} from "mongoose";

const credentialsSchema = new Schema(
    {

        site_url:{
            type: String,
            required: true,
            unique: true,
            trim: true,
            index: true

        },

        username:{
            type: String,
            required: true,
            lowercase: true,
            trim: true,
            index: true
        },

        password:{
            required: [true, "Password is required"],
            type: String
        },

        owner:{
            type: Schema.Types.ObjectId,
            ref: "User"
        }    

    },

    {
        timestamps: true
    })

export const Credential = mongoose.model("Credential", credentialsSchema)