const {PORT, 
    CONNECTION_URL,
     JWT_SECRET, 
     GMAIL_USER, 
     GMAIL_PASSWORD} = process.env;


module.exports = {port:
        PORT, connectionUrl:
      CONNECTION_URL, jwtSecret:
       JWT_SECRET, gmail_user: GMAIL_USER, 
       gmail_password: GMAIL_PASSWORD}