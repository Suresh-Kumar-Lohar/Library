import jwt from "jsonwebtoken";

export const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers["authorization"];

    if (!token) {
      return res.status(401).json({
        message: "Unauthorized ! Please provide token !",
        data: {},
        success: false
      })
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    if (!decodedToken) {
      return res.status(401).json({
        message: "Unauthorized ! Invalid token !",
        data: {},
        success: false
      })
    }
    req.userId = decodedToken?.userId;
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid token !",
      data: {},
      success: false
    })
  }
}