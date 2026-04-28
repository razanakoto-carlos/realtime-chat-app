import type { Request, Response } from "express";
import User from "../models/User";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken";

export async function authRegister(req: Request, res: Response) {
  try {
    const { email, password, name, avatar } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      email,
      password: hashedPassword,
      name,
      avatar,
    });

    const user = await newUser.save();

    const token = generateToken(user._id);

    res.cookie("authToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(201).json({
      status: "Register successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
}

export async function authLogin(req: Request, res: Response) {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid Emails" });
    }

    const hasPassword = await bcrypt.compare(password, user.password);

    if (!hasPassword) {
      return res.status(400).json({ message: "Invalid Password" });
    }

    const token = generateToken(user._id);

    res.cookie("authToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      status: "Login successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
}

export async function authLogout(req: Request, res: Response) {
  try {
    res.clearCookie("authToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    res.status(200).json({ status: "Logout successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
}

export async function me(req: Request, res: Response) {
  try {
    const findUser = req.user;
    const user = await User.findById(findUser.user);

    if (!user) {
      return res.status(400).json({ message: "Not authenticate" });
    }

    res.status(200).json({
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
}

export async function getUsers(req: Request, res: Response) {
  try {
    const users = await User.find({ _id: { $ne: req.user?.user } }).select(
      "-password",
    );

    if (!users) {
      return res.status(400).json({ message: "The users List is empty" });
    }

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
}
