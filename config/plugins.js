module.exports = ({ env }) => ({
  // ...
  email: {
    provider: "nodemailer-v3",
    providerOptions: {},
    settings: {
      host: env("EMAIL_HOST"),
      port: env.int("EMAIL_PORT"),
      username: env("EMAIL_USERNAME"),
      password: env("EMAIL_PASSWORD"),
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
