// import mongoose, { Schema, Document } from 'mongoose'

// export interface IUser extends Document {
//   name: string
//   email: string
// }

// const UserSchema: Schema = new Schema({
//   name: { type: String, required: true },
//   email: { type: String, required: true },
// })

// export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema)

import mongoose, { Document } from 'mongoose';

export enum UserRole {
  USER = 'user',
  ADMIN = 'admin'
}

interface IUser extends Document {
  phone: string;
  name?: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new mongoose.Schema({
  phone: { type: String, required: true, unique: true },
  name: { type: String },
  role: { type: String, enum: Object.values(UserRole), default: UserRole.USER }
}, { timestamps: true, collection: 'user' });

export default mongoose.models.User || mongoose.model<IUser>('User', userSchema);
