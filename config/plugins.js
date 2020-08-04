module.exports = ({ env }) => ({
  // ...
  email: {
    provider: "nodemailer-v3",
    providerOptions: {},
    settings: {
      host: "smtp.gmail.com",
      port: 465,
      username: "the.paczka",
      password: "p4czk4m41l",
      secure: true,
    },
  },
});
