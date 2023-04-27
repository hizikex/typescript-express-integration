"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
function requireAuth(req, res, next) {
    if (req.session && req.session.loggedIn) {
        return next();
        return;
    }
    res.status(403);
    res.redirect('/');
}
const router = (0, express_1.Router)();
exports.router = router;
router.get('/login', (req, res) => {
    res.send(`
    <form method="POST">
        <div>
        <label>Email</label>
        <input name="email" />
        </div>
        <div>
        <label>Password</label>
        <input name="password" type="password"/>
        </div>
        <button>Submit</button>
    </form>
    `);
});
router.post('/login', (req, res) => {
    const { email, password } = req.body;
    if (email && password && email === 'hizik@g.com' && password === 'password') {
        //marked person as logged in
        req.session = { loggedIn: true };
        //redirect them to the root route
        res.redirect('/');
    }
    else {
        res.send(`Invalid email or password`);
    }
});
router.get('/', (req, res) => {
    if (req.session && req.session.loggedIn) {
        res.send(`
        <div>
            <div> YOU ARE LOGGED IN</div>
            <a href="/logout">Logout</a>
        </div>
        `);
    }
    else {
        res.send(`
        <div>
            <div> YOU ARE NOT LOGGED IN</div>
            <a href="/login">Login</a>
        </div>
        `);
    }
});
router.get('/logout', (req, res) => {
    req.session = undefined;
    res.redirect('/');
});
router.get('unprotected', requireAuth, (req, res) => {
    res.send('Welcome to the protected route, logged in user');
});
