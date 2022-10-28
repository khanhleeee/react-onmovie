
const WHITELIST_DOMAIN = [
    process.env.LOCAL_DOMAIN,
    process.env.LOCAL_DOMAIN1,
];
const corsOptions = {
    origin: function(origin, callback) {
        if (WHITELIST_DOMAIN.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error(`${origin} is not allowed by CORS`))
        }
    },
    credentials: true,
    optionSuccessStatus: 200,
}