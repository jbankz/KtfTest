
import express from 'express';
import UsersMiddleware from './middleware/users_middleware';
import UsersController from './controller/users_controller';
import { CommonRoutesConfig } from './config/common_route';

export class UsersRoutes extends CommonRoutesConfig {
    constructor(app: express.Application) {
        super(app, 'UsersRoutes');
    }

    configureRoutes() {

        this.app
        .route(`/message`)
        .post(
            UsersMiddleware.validateRequiredUserBodyFields,
            UsersController.sendMessage
        );

        this.app.route(`/categories`).get(UsersController.categories);

        return this.app;
    }

}