import express from 'express';
import nodemailer from "nodemailer";

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
            
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            secure: true,
            port: 465,
            auth: {
              user: process.env.MAIL_SENDER as string,
              pass: process.env.MAIL_PASSWORD as string,
            }
          });

          const info = await transporter.sendMail({
            from: process.env.MAIL_SENDER as string,
            to: email,
            subject: `Welcome, ${name}`,
            text: message
          });

          if(info){
            res.status(200).send({
                status: true,
                message: "Email sent successfully"
            });
          }
            
           } catch (error) {
            console.log(error);
            res.status(400).send({
                status: false,
                message: "Failed to send mail"
            });
           }}

}

export default new UsersController();