"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const querystring_1 = __importDefault(require("querystring"));
const axios_1 = __importDefault(require("axios"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config();
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;
const FRONTEND_URI = process.env.FRONTEND_URI;
const PORT = process.env.PORT || 9001;
const app = (0, express_1.default)();
// Priority serve any static files.
app.use(express_1.default.static(path_1.default.resolve(__dirname, "./client/build")));
/**
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */
const generateRandomString = (length) => {
    let text = "";
    const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
};
const stateKey = "spotify_auth_state";
app.get("/login", (req, res) => {
    const state = generateRandomString(16);
    res.cookie(stateKey, state);
    const scope = ["user-read-private", "user-read-email", "user-top-read"].join(" ");
    const queryParams = querystring_1.default.stringify({
        client_id: CLIENT_ID,
        response_type: "code",
        redirect_uri: REDIRECT_URI,
        state: state,
        scope: scope,
    });
    console.log(queryParams);
    res.setHeader("Cache-Control", "s-max-age=1, stale-while-revalidate");
    res.redirect(`https://accounts.spotify.com/authorize?${queryParams}`);
});
app.get("/callback", (req, res) => {
    const code = req.query.code || null;
    (0, axios_1.default)({
        method: "post",
        url: "https://accounts.spotify.com/api/token",
        data: querystring_1.default.stringify({
            grant_type: "authorization_code",
            code: code || null,
            redirect_uri: REDIRECT_URI,
        }),
        headers: {
            "content-type": "application/x-www-form-urlencoded",
            Authorization: `Basic ${Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString("base64")}`,
        },
    })
        .then(response => {
        if (response.status === 200) {
            const { access_token, refresh_token, expires_in } = response.data;
            const queryParams = querystring_1.default.stringify({
                access_token,
                refresh_token,
                expires_in,
            });
            res.redirect(`${FRONTEND_URI}/?${queryParams}`);
        }
        else {
            res.redirect(`/?${querystring_1.default.stringify({ error: "invalid_token" })}`);
        }
    })
        .catch(error => {
        res.send(error);
    });
});
app.get("/refresh_token", (req, res) => {
    const { refresh_token } = req.query;
    (0, axios_1.default)({
        method: "post",
        url: "https://accounts.spotify.com/api/token",
        data: querystring_1.default.stringify({
            grant_type: "refresh_token",
            refresh_token: refresh_token,
        }),
        headers: {
            "content-type": "application/x-www-form-urlencoded",
            Authorization: `Basic ${Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString("base64")}`,
        },
    })
        .then(response => {
        res.send(response.data);
    })
        .catch(error => {
        res.send(error);
    });
});
// All remaining requests return the React app, so it can handle routing.
app.get("*", (req, res) => {
    res.sendFile(path_1.default.resolve(__dirname, "./client/build", "index.html"));
});
app.listen(PORT, () => {
    console.log(`Express app listening at http://localhost:${PORT}`);
});
module.exports = app;
