import User from "../Models/User.js";
import Task from "../Models/Task.js";
import bcrypt from "bcrypt";
import validator from "validator";
import { genrateToken } from "../utils/generateJWTToken.js";

// register user
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;

    //     check if fields are missing
    if (!email || !name || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    //checking email
    if (!validator.isEmail(email)) {
      return res.status(400).json({
        message: "Invalid email",
      });
    }

    // comparing password
    if (password !== confirmPassword) {
      return res.status(400).json({
        message: "Password not matched",
      });
    }

    // strong password
    if (
      !validator.isStrongPassword(password, {
        minLength: 8,
        minUppercase: 1,
        minLowercase: 1,
        minNumbers: 1,
        minSymbols: 0,
      })
    ) {
      return res.status(400).json({
        message: "Password must contain uppercase, lowercase and 8 characters",
      });
    }

    //     check user exist
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    //     creating user
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });
    const token = genrateToken(newUser._id);
    newUser.password = undefined;
    return res.status(201).json({
      success: true,
      message: "User created successfully",
      token,
      user: newUser,
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

// login function
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    //     check if fields are missing
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    //checking email
    if (!validator.isEmail(email)) {
      return res.status(400).json({
        message: "Invalid email",
      });
    }
    // strong password
    if (
      !validator.isStrongPassword(password, {
        minLength: 8,
        minUppercase: 1,
        minLowercase: 1,
        minNumbers: 1,
        minSymbols: 0,
      })
    ) {
      return res.status(400).json({
        message: "Password must contain uppercase, lowercase and 8 characters",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found: Invalid email or password",
      });
    }

    if (!(await user.comparePassword(password))) {
      return res.status(400).json({
        success: false,
        message: "Invalid password",
      });
    }

    const token = genrateToken(user._id);
    user.password = undefined;
    return res.status(200).json({
      success: true,
      message: "User login successfully",
      token,
      user: user,
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

// get all Task
export const getUserTask = async (req, res) => {
  try {
    const userId = req.userId;
    if (!userId) {
      return res.status(400).json({ success: false, message: "No user Id" });
    }
    const allTask = await Task.find({ userId });

    if (!allTask) {
      return res
        .status(400)
        .json({ success: false, message: "No Task is created by user" });
    }

    return res.status(201).json({ allTask });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

// geting user
export const getMe = async (req, res) => {
  const user = await User.findById(req.userId).select("-password");

  res.json(user);
};
