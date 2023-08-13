import { Request, Response } from "express";
import Users, { IUser } from "../model/userModel"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config();

export const loginUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400);
        throw new Error("All Fields are mandatory")
    }
    try {
        const user = await Users.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "Invalid Email" });
        }
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(401).json({ message: "Invalid Password" })
        }
        const token = jwt.sign({
            user: {
                username: user.username,
                roles: user.roles,
                email: user.email,
                id: user._id,
            },
        }, process.env.ACCESS_TOKEN_SECRET!, { expiresIn: '1h' });
        res.json({ token });
    }
    catch (err) {
        res.status(500).json({ error: 'Could not Log in' })
    }
}

export const registerUser = async (req: Request, res: Response) => {
    const { username, email, password, roles } = req.body;
    if (!username || !email || !password) {
        res.status(400);
        throw new Error("All fields are mandatory")
    }
    const userAvailable = await Users.findOne({ email });
    if (userAvailable) {
        res.status(400);
        throw new Error("User already existed");
    }
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser: IUser = new Users({
            username,
            email,
            password: hashedPassword,
            roles
        });
        const savedUser = await newUser.save();
        res.status(201).json({ _id: savedUser.id, email: savedUser.email });
    }
    catch (err) {
        res.status(500).json({ error: "Could not register user" });
    };

}

export const currentUser = async (req: Request, res: Response) => {
    res.json((<any>req).user)
}

// const SECRET_KEY:string | undefined = process.env.ACCESS_TOKEN_SECRET;