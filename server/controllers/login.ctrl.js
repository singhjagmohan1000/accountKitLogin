const path = require("path");
const HOMEDIR = path.join(__dirname, "..");
const CONFIG = require(path.join(HOMEDIR, "config", "config"));
const Request = require('request');
const Querystring = require('querystring');
module.exports = {
    loginUser: (req, res, next) => {
            console.log("hi")
        if (req.body.csrf === "xicetw") {
            var app_access_token = ['AA', CONFIG.FACEBOOK.APP_ID, CONFIG.FACEBOOK.ACCOUNT_KIT_APP_SECRET].join('|');
            var params = {
                grant_type: 'authorization_code',
                code: req.body.code,
                access_token: app_access_token
            };
            var token_exchange_url = CONFIG.FACEBOOK.ACCOUNT_KIT_TOKEN_BASE_URL + '?' + Querystring.stringify(params);
            Request.get({ url: token_exchange_url, json: true }, function (err, resp, respBody) {
                console.log(respBody);
                var view = {
                    user_access_token: respBody.access_token,
                    expires_at: respBody.expires_at,
                    user_id: respBody.id,
                };
                // get account details at /me endpoint
                var me_endpoint_url = CONFIG.FACEBOOK.ACCOUNT_KIT_BASE_URL + '?access_token=' + respBody.access_token;
                Request.get({ url: me_endpoint_url, json: true }, function (err, resp, respBody) {
                    if(err)
                    {console.log(err)
                    res.send("error")
                    }
                    else{
                    // send login_success.html
                    console.log(respBody);
                    if (respBody.phone) {
                        view.method = "SMS"
                        view.identity = respBody.phone.number;
                        console.log(view.identity);
                        
                    } else if (respBody.email) {
                        view.method = "Email"
                        view.identity = respBody.email.address;
                        
                    }
                    
                    res.send("Login Successful");}
                });
            });
        }
        else{
            res.send("Something went wrong. :( ");
        }
    }

};