import jwt from "jsonwebtoken";
export default function generateToken(id: any) {
  return jwt.sign({ id }, process.env.JWT_SECRET as string, {
    expiresIn: "7d",
  });
}
