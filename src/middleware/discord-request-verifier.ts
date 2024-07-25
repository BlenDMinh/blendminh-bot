import { Injectable, NestMiddleware } from "@nestjs/common";
import { verifyKey, verifyKeyMiddleware } from "discord-interactions";
import { Request, Response } from "express";

@Injectable()
export default class DiscordRequestVerifier implements NestMiddleware {
    use(req: Request, res: Response, next: (error?: Error | any) => void) {
        const signature = req.get['x-signature-ed25519'];
        const timestamp = req.get['x-signature-timestamp'];

        const clientKey = process.env.PUBLIC_KEY;

        const isValidRequest = verifyKey(req.body, signature, timestamp, clientKey);

        if(!isValidRequest) {
            res.status(401).send('Unauthorized');
            throw new Error('Unauthorized');
        }

        next();
    }
}