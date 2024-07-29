const jwt = require("jsonwebtoken");
const { userModel } = require("../models/user.model");

const checkUserRole = (allowedRoles) => {
  return (req, res, next) => {
    let token = req.headers.authorization;
    console.log(token);
    if (!token) {
      return res.status(401).send({ message: "Unauthorized" });
    }

    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
      if (err) {
        console.log(token);
        console.log(err);
        return res.status(401).send({ message: "Unauthorized" });
      }

      try {
        const user = await userModel.findById(decoded.id);
        if (user && allowedRoles.includes(user.role)) {
          req.user = user;
          next();
        } else {
          return res.status(401).send({ message: "Unauthorised" });
        }
      } catch (error) {
        return res.status(500).send({ message: "Internal server error" });
      }
    });
  };
};

module.exports = {
  checkUserRole,
};
