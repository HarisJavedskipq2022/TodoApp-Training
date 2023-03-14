"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const google_auth_library_1 = require("google-auth-library");
require("dotenv/config");
const router = express_1.default.Router();
const client = new google_auth_library_1.OAuth2Client(process.env.CLIENT_ID, process.env.CLIENT_SECRET, process.env.REDIRECT_URL);
const redirectUrl = client.generateAuthUrl({ access_type: 'offline', prompt: 'consent', scope: ['email', 'profile'] });
router.post("/", (req, res) => {
    res.redirect(redirectUrl);
});
router.post("/callback", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const code = req.query.code;
    try {
        const { tokens } = yield client.getToken(code);
        const idToken = tokens.id_token;
        const ticket = client.verifyIdToken({
            idToken,
            audience: process.env.CLIENT_ID,
        });
        const payload = (yield ticket).getPayload();
        if (payload) {
            const email = payload.email;
            // Do something with the email (e.g. create a user account)
            res.send(`Logged in with Google as ${email}!`);
        }
        else {
            res.send("No payload found in Google response");
        }
    }
    catch (err) {
        console.error(err);
        res.send("Error in Google authentication");
    }
}));
exports.default = router;
