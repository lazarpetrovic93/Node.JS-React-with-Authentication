import express from 'express'
import { merge } from 'lodash'

import { getUserBySessionToken } from '../db/users'

export const isAuthenticated = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        // take token from login
        const sessionToken = req.cookies['LAZAR-AUTH'];

        if (!sessionToken) {
            // if session token is not defined return status 403
            return res.sendStatus(403);
        }

        const existingUser = await getUserBySessionToken(sessionToken);
        if (!existingUser) {
            return res.sendStatus(403)
        }

        merge(req, { identity: existingUser });
        return next();
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}