const mssql = require('mssql');
const sqlConfig = require('../database/dbConnection');

module.exports = {
    login: async (req, res) => {
        try {
            const pool = await mssql.connect(sqlConfig);
            const query = 'SELECT * FROM USERS WHERE U_USERNAME = \'' + req.query.username + '\' AND U_PASSWORD = \'' + req.query.password + '\'';
            const result = await pool.request().query(query);
            if (result.recordset.length == 0) {
                res.status(200).json({
                    message: 'Wrong username or password'
                });
            } else {
                res.status(200).json({
                    message: 'Login successfully'
                });
            }
        } catch (error) {
            console.log(error);
        }
    },
    google: async (req, res) => {
        function getGoogleAuthURL() {
            const rootUrl = "https://accounts.google.com/o/oauth2/v2/auth";
            const options = {
                redirect_uri: "http://localhost:4000/auth/google",
                client_id: '363444450027-njg4vpoq62lrck8fia21fgmalg06sms5.apps.googleusercontent.com',
                access_type: "offline",
                response_type: "code",
                prompt: "consent",
                scope: [
                    "https://www.googleapis.com/auth/userinfo.profile",
                    "https://www.googleapis.com/auth/userinfo.email",
                ].join(" "),
            };
            return `${rootUrl}?${new URLSearchParams(options)}`;
        }
        return res.send(getGoogleAuthURL());
    },
    getTokens: ({ code, clientId, ClientSecret, redirectUri }) => {
        /*
        * Uses the code to get tokens
        * that can be used to fetch the user's profile
        */
        const url = "https://oauth2.googleapis.com/token";
        const values = {
            code,
            client_id: '363444450027-njg4vpoq62lrck8fia21fgmalg06sms5.apps.googleusercontent.com',
            client_secret: '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',
            redirect_uri: "http://localhost:4000/auth/google",
            grant_type: "authorization_code",
        };
        return axios
            .post(url, new URLSearchParams(values), {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            })
            .then((res) => {
                return res.data;
            })
            .catch((error) => {
                console.error(`Failed to fetch auth tokens`);
                throw new Error(error.message);
            });
    },
    verifyEmail: async (req, res) => {
        try {
            const { code } = req.query;
            const CLIENTID = '363444450027-njg4vpoq62lrck8fia21fgmalg06sms5.apps.googleusercontent.com'
            const CLIENTSCERET = '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'
            const REDIRECTURL = 'http://localhost:4000/auth/google'
            const tokensRes = await getTokens({ code, CLIENTID, CLIENTSCERET, REDIRECTURL });
            // Fetch the user's profile with the access token and bearer
            const googleUser = await axios
            .get(
                `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${tokensRes.access_token}`,
                {
                headers: {
                    Authorization: `Bearer ${tokensRes.id_token}`,
                },
                }
            )
            .then((res) => res.data)
            .catch((error) => {
                console.error(`Failed to fetch user`);
                throw new Error(error.message);
            });
    
            const accessToken = jwt.sign(googleUser, process.env.JWT_ACCESS_TOKEN);
    
            console.log(googleUser);
    
            res.cookie('cookie', accessToken, {
                maxAge: 900000,
                httpOnly: true,
                secure: false,
            });
            res.send(googleUser);
        }
        catch (error) {
            console.log(error);
        }
    }
}