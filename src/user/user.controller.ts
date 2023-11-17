import { Router } from 'express';
import userService from './user.service';

const router = Router();

router.post('/signup', (req, res, next) => {
    const { email, password } = req.body;

    userService
        .create(email, password)
        .then(() => res.json({}))
        .catch(err => next(err));
});

router.put('/update', (req, res, next) => {
    userService.update(req.auth.sub, req.body.email)
        .then(() => res.json({}))
        .catch(err => next(err));
});

router.post('/login', (req, res, next) => {
    const { email, password } = req.body;

    userService
        .authenticate(email, password)
        .then(user => user ? res.json(user) : res.status(400).json({ message: 'Email or password is incorrect' }))
        .catch(err => next(err));
});

router.post('/logout', () => {
    throw new Error('not implemented');
});

export default router;
