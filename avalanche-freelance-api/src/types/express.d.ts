import { Types } from 'mongoose';

declare global {
  namespace Express {
    interface User {
      _id: Types.ObjectId | string;
      id: string;
      email: string;
      role: "client" | "freelancer";
      name: string;
      isVerified: boolean;
    }
    
    interface Request {
      user?: User;
    }
  }
}

export {};
