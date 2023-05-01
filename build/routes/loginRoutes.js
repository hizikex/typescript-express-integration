"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
var express_1 = require("express");
function requireAuth(req, res, next) {
    if (req.session && req.session.loggedIn) {
        next();
        return;
    }
    res.status(403);
    res.send('Not permitted');
}
var router = (0, express_1.Router)();
exports.router = router;
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
router.get('/', function (req, res) {
    if (req.session && req.session.loggedIn) {
        res.send("\n        <div>\n            <div> YOU ARE LOGGED IN</div>\n            <a href=\"/logout\">Logout</a>\n        </div>\n        ");
    }
    else {
        res.send("\n        <div>\n            <div> YOU ARE NOT LOGGED IN</div>\n            <a href=\"/login\">Login</a>\n        </div>\n        ");
    }
});
router.get('/logout', function (req, res) {
    req.session = undefined;
    res.redirect('/');
});
router.get('/protected', requireAuth, function (req, res) {
    res.send('Welcome to the protected route, logged in user');
});
