import express, {Request, Response} from 'express';
import { router } from './routes/loginRoutes';
import bodyParser from 'body-parser';
import cookieSession from 'cookie-session';
import { AppRouter } from './AppRouter';
import './controllers/loginController';
import './controllers/RootController'

const PORT = 4747;
const app = express();

// app.get('/', (req: Request, res: Response) => {
//     res.send(`
//     <div>
//         <h1>Hi there!</h1>
//     <div>
//     `)
// })
app.use(bodyParser.urlencoded({ extended: true}));
app.use(cookieSession({keys: ['jerry']}));
// app.use(router);
app.use(AppRouter.getInstance());

app.listen(PORT, ()=>{
    console.log(`Listening on ${PORT}`);
})