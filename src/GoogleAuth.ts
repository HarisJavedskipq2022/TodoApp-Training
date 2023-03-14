import express, {Request, Response} from "express";
import { OAuth2Client } from "google-auth-library";
import "dotenv/config"


const router = express.Router();

const client = new OAuth2Client(process.env.CLIENT_ID as string, process.env.CLIENT_SECRET as string, process.env.REDIRECT_URL as string);

const redirectUrl = client.generateAuthUrl({access_type: 'offline', prompt: 'consent', scope:['email', 'profile']})


router.post("/", (req: Request, res: Response) => {
   
    res.redirect(redirectUrl);
});

router.post("/callback", async (req: Request, res: Response) => {
    const code = req.query.code as string;

    try {
        const { tokens } = await client.getToken(code);
        const idToken = tokens!.id_token!;
        const ticket = client.verifyIdToken({
            idToken,
            audience: process.env.CLIENT_ID,
        });
        const payload = (await ticket).getPayload();
        if (payload) {
            const email = payload.email;
            // Do something with the email (e.g. create a user account)
            res.send(`Logged in with Google as ${email}!`);
        } else {
            res.send("No payload found in Google response");
        }
    } catch (err) {
        console.error(err);
        res.send("Error in Google authentication");
    }
});

export default router;
