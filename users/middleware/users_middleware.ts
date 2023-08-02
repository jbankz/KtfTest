import express from 'express';
import {  validateUserSchema } from '../schema/user_schema';


class UsersMiddleware {
    async validateRequiredUserBodyFields(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) {

        const {error} = validateUserSchema(req.body);

        if(error) return res.status(400).json({
            status: false,
            message: 'The following fields are required',
            error: error.details
        });
        
       next();
    }       
}

export default new UsersMiddleware()