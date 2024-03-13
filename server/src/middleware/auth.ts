import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Define an interface extending the default Request interface to include the user property
interface AuthRequest extends Request {
    user?: any; // Define the user property here with appropriate type
}

const auth = (req: AuthRequest, res: Response, next: NextFunction): void => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer")) {
        res.sendStatus(401).send("Unauthorized");
        return;
    }

    const token = authHeader.split(" ")[1];

    jwt.verify(token, process.env.JWT_TOKEN as string, (err: any, decoded: any) => {
        if (err) {
            console.error("JWT verification error:", err);
            res.status(401).send("Unauthorized");
            return;
        }

        // Assign the decoded token to req.user
        req.user = decoded; // Assuming the decoded token contains the entire user object

        next();
    });
};

export default auth;
