module.exports = ({ env }) => ({
  // ...
  email: {
    provider: "nodemailer-v3",
    providerOptions: {},
    settings: {
      host: "smtp.gmail.com",
      port: 465,
      username: "gartenfest2020",
      password: "Wzw>uJAoxa9zn*aE",
      secure: true,
    },
  },
  upload: {
    provider: "cloudinary",
    providerOptions: {
      cloud_name: env("CLOUDINARY_NAME"),
      api_key: env("CLOUDINARY_KEY"),
      api_secret: env("CLOUDINARY_SECRET"),
    },
  },
});
