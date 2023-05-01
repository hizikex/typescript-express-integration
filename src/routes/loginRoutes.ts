import {Router, Request, Response, NextFunction} from 'express';

interface RequestWithBody extends Request {
    body: {[key: string]: string | undefined}
}

function requireAuth(req: Request, res: Response, next: NextFunction) {
    if (req.session && req.session.loggedIn) {
        next();
        return;
    }

    res.status(403);
    res.send('Not permitted')
}

const router = Router();

// router.get('/login', (req: Request, res: Response) => {
//     res.send(`
//     <form method="POST">
//         <div>
//         <label>Email</label>
//         <input name="email" />
//         </div>
//         <div>
//         <label>Password</label>
//         <input name="password" type="password"/>
//         </div>
//         <button>Submit</button>
//     </form>
//     `)
// })

// router.post('/login', (req: RequestWithBody, res: Response) => {
//     const {email, password} = req.body;

//     if (email && password && email === 'hizik@g.com' && password === 'password')  {
//         //marked person as logged in
//         req.session = {loggedIn: true};
//         //redirect them to the root route
//         res.redirect('/');
//     } else {
//         res.send(`Invalid email or password`)
//     }
// });


export {router}