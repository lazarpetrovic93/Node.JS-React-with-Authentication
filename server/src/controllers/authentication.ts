import express from 'express'
import { createUser, getUserByEmail } from '../db/users';
import { authentication, random } from '../helpers';

// User registration
export const register = async (req: express.Request, res: express.Response) => {
    try {
        const { email, password, first_name, last_name } = req.body
        if (!email || !password || !first_name || !last_name) {
            return res.sendStatus(400);
        }

        const existingUser = await getUserByEmail(email)
        if (existingUser) {
            return res.status(400).json({
                message: 'Email already exist.'
            }).end();
        }

        const salt = random();
        const user = await createUser({
            email,
            first_name,
            last_name,
            authentication: {
                salt,
                password: authentication(salt, password)
            }
        })

        return res.status(200).json({
            message: 'User registered successfully.'
        }).end();
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            message: 'Registration failed.'
        })
    }
}

// User login
export const login = async (req: express.Request, res: express.Response) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            return res.sendStatus(400);
        }
        const user = await getUserByEmail(email).select('+authentication.salt +authentication.password')

        if (!user) {
            return res.status(400).json({
                message: 'User not registred.',
            }).end();
        }
        const expectedHash = authentication(user.authentication.salt, password);
        if (user.authentication.password !== expectedHash) {
            return res.sendStatus(403);
        }
        const salt = random();
        user.authentication.sessionToken = authentication(salt, user._id.toString());
        await user.save();
        res.cookie('LAZAR-AUTH', user.authentication.sessionToken, { domain: 'localhost', path: '/' })

        return res.json({
            message: "Logged in Successfully.",
            data: {
                user: {
                    first_name: user.first_name,
                    last_name: user.last_name,
                    token: user.authentication.sessionToken,
                }
            }
        }).end();
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}