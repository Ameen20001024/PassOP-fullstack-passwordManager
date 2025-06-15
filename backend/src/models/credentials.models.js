import mongoose, {Schema} from "mongoose";

const credentialsSchema = new Schema(
    {

        site_url:{
            type: string,
            required: true,
            unique: true,
            trim: true,
            index: true

        },

        username:{
            type: string,
            required: true,
            lowercase: true,
            trim: true,
            index: true
        },

        password:{
            required: [true, "Password is required"],
            type: string
        },

        owner:{
            type: Schema.Types.ObjectId,
            ref: "User"
        }    

    },

    {
        timestamps: true
    })

export const Credentials = mongoose.model("Playlist", credentialsSchema)