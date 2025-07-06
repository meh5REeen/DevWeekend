import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        }
        ,
        avatar:{
            type:String,
            default:"https://www.google.com/imgres?q=profile%20image&imgurl=https%3A%2F%2Fimg.freepik.com%2Ffree-photo%2Fportrait-expressive-young-man-wearing-formal-suit_273609-6942.jpg%3Fsemt%3Dais_hybrid%26w%3D740&imgrefurl=https%3A%2F%2Fwww.freepik.com%2Ffree-photos-vectors%2Fprofessional-profile&docid=FxPgXZHIf-kYbM&tbnid=4tsqutEvRald5M&vet=12ahUKEwi14en0iqiOAxWXg_0HHbm9IEgQM3oECHAQAA..i&w=740&h=493&hcb=2&ved=2ahUKEwi14en0iqiOAxWXg_0HHbm9IEgQM3oECHAQAA"
        }
    },
    { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
