import type { Request, Response, NextFunction } from "express";
import type { ZodObject } from "zod";

const validateRequest = (schema: ZodObject) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    console.log("Validation result:", result);
    if (!result.success) {
      return res.status(400).json({
        message: "Validation error",
        errors: result.error.flatten().fieldErrors,
      });
    }

    req.body = result.data;
    next();
  };
};

export default validateRequest;
