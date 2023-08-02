import express from 'express';
import Mailgun from 'mailgun-js';

class UsersController {
 
async categories(req: express.Request, res: express.Response) {
    try {
        
         res.status(200).send({
            status: true,
            message: "Successfully retrieved categories",
            items: [{id: 1, name: 'Shoes'},{id: 2, name: 'Cloths'},{id: 3, name: 'Electronics'},{id: 4, name: 'Gadgets'},]
        });
       } catch (error) {
        res.status(400).send({
            status: false,
            message: "Failed to fetch categories"
        });
       }}


async sendMessage(req: express.Request, res: express.Response) {
        try {
            const {name, email, message} = req.body;
            
          
         await Mailgun({
                apiKey: process.env.MAILGUN_DOMAIN as string,
                domain: process.env.MAILGUN_API_KEY as string,
             }).messages().send({
                from: process.env.MAILGUN_SENDER as string,
                to: email,
                subject: `Welcome ${name}`,
                text: message
             });
    
             res.status(200).send({
                status: true,
                message: "Email sent successfully"
            });
           } catch (error) {
            console.log(error);
            res.status(400).send({
                status: false,
                message: "Failed to send mail"
            });
           }}

}

export default new UsersController();