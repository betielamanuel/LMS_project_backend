const passport = require("passport");

exports.googleAuth = passport.authenticate("google", {
  scope: ["profile", "email"],
});

exports.googleAuthCallback = passport.authenticate("google", {
  failureRedirect: "/login",
});

exports.authSuccess = (req, res) => {
  res.redirect("/dashboard");
};

exports.logout = (req, res) => {
  req.logout(() => {
    res.redirect("/");
  });
};
