import { Schema, model, Document, ObjectId } from 'mongoose';

interface IUser extends Document {
    username: string;
    email: string;
    thoughts: ObjectId[];
    friends: ObjectId[];
    friendCount?: number; // Having the question marks makes this thingy an optional field on the schema
}

const userSchema = new Schema<IUser>(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/.+@.+\..+/, 'ts gotta match a valid email'],
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User',
            }
        ],
        friendCount: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User', 
            }
        ],
    },
    {
        toJSON: { virtuals: true},
        id: false,
    },  
);

userSchema
    .virtual('friendCount')
    .get(function (this: IUser){
        return this.friends.length //not string like subdoc cuz set friends to be type number
    })

const User = model('user', userSchema);

export default User;