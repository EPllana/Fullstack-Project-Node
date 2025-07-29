import dotenv from "dotenv";
dotenv.config();
import express from "express";
import User from "../user/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const secretKey = process.env.SECRET_KEY; // nga .env

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Wrong Password" });
    }

    const payload = {
      id: user._id,
      role: user.role,
    };

    const token = jwt.sign(payload, secretKey, { expiresIn: "1h" });

    return res.status(200).json({ token });

  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
