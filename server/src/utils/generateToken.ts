import jwt from "jsonwebtoken";
export default function generateToken(user: any) {
  return jwt.sign({ user }, process.env.JWT_SECRET as string, {
    expiresIn: "7d",
  });
}
