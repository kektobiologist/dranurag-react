var passport = require("passport");

module.exports = app => {
  /// AUTH ROUTING

  app.post(
    "/api/login",
    passport.authenticate("local", {
      successRedirect: "/api/checkLoggedIn",
      failureRedirect: "/api/checkLoggedIn",
      failureFlash: true,
      successFlash: true
    })
  );

  app.get("/api/logout", function(req, res) {
    req.logout();
    req.flash("success", "Logged out.");
    res.redirect("/api/checkLoggedIn");
  });

  // this will probably only be accessed after login?
  app.get("/api/checkLoggedIn", (req, res) => {
    if (req.user) res.json(true);
    else res.json(false);
  });

  // auth redirect
  app.use("/api", (req, res, next) => {
    if (!req.user) {
      res.status(401);
      res.json("Unauthorized");
    } else {
      next();
    }
  });
};
