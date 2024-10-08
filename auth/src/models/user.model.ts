import PasswordManager from "@/services/password.hashing";
import mongoose from "mongoose";

// interface for user attributes
interface UserAttrs {
  email: string;
  password: string;
}

// interface for user document
interface UserDoc extends mongoose.Document {
  email: string;
  password: string;
}

// interface for user Model
interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
}, {
  toJSON:{
    transform(doc, ret) {
      ret.id = ret._id
      delete ret._id 
      delete ret.password
      delete ret.__v
    }
  }
});

userSchema.pre('save', async function (done) {
  if (this.isModified('password')) {
    const hashed = await PasswordManager.toHash(this.get('password'))    
    this.set("password", hashed)
  }

  done()
})

userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};

const User = mongoose.model<UserDoc, UserModel>("User", userSchema);

export { User };