import { Request, Response } from 'express';
import User from "../models/User";
import {AuthenticatedRequest} from "../types/types";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {SECRET_KEY} from "../middleware/auth";

export const getUser = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const user = await User.findOne({email: req.email?.email});
        if (!user) {
            return res.status(404).json({message: 'User not found'});
        }
        res.json({ firstName: user.firstName, lastName: user.lastName });
    } catch (error){
        console.log("Error fetching user: ", error);
        res.status(500).json({message: 'Server error: fetching user error! '});
    }
};

export const createUser = async (req: Request, res: Response) => {
    const { firstName, lastName, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 12);

    const token = jwt.sign({ email }, SECRET_KEY, { expiresIn: '1h' });

    const newUser = new User({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        token
    });

    await newUser.save();

    res.json({ token });
};