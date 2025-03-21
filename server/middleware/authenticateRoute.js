const jwt = require("jsonwebtoken");

const authenticateRoute = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
  if (!decoded) {
    return res.status(401).json({ message: "Unauthorized" });
  }

    req.userId = decoded.userId;
    next();
  } catch (error) {
    next({error,message:"Unauthorized",status:401});
  }
};

module.exports = authenticateRoute;
