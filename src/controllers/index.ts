import { Request, Response } from 'express';

class UserController {
    public createUser(req: Request, res: Response): void {
        // Logic for creating a user
        res.send('User created');
    }

    public getUser(req: Request, res: Response): void {
        // Logic for retrieving a user
        res.send('User details');
    }
}

export { UserController };