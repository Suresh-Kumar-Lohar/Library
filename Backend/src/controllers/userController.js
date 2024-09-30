import bcrypt from "bcrypt";
import UserModel from "../models/userModel.js";
import jwt from "jsonwebtoken";

class UserController {
  async signUp(req, res) {
    try {
      const { firstName, lastName, mobile, email, password } = req.body;

      if (!(firstName && lastName && mobile && email && password)) {
        return res.handler.badRequest("Request inputs are not valid!");
      }

      const checkUserExist = await UserModel.findUser({ email });

      if (checkUserExist) {
        return res.handler.badRequest("User already exist!")
      }

      const hashedPassword = bcrypt.hashSync(password, 10);

      const user = await UserModel.createUser({ firstName, lastName, mobile, email, password: hashedPassword });

      let userDetails = {
        firstName: user?._doc.firstName,
        lastName: user?._doc.lastName,
        mobile: user?._doc.mobile,
        email: user?._doc.email
      };

      if (user) {
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
        await UserModel.createUserToken({ userId: user._id, token });
        userDetails.token = token;
      }

      return res.handler.success("User has been signed-up successfully!", userDetails)
    } catch (error) {
      return res.handler.serverError(error);
    }
  }

  async userLogin(req, res) {
    try {
      const { email, password } = req.body;

      if (!(email && password)) {
        return res.handler.badRequest("Request inputs are not valid!");
      }

      const user = await UserModel.findUser({ email });

      if (!user) {
        return res.handler.badRequest("Invalid Email!");
      }

      if (!bcrypt.compareSync(password, user?.password)) {
        return res.handler.badRequest("Incorrect password!");
      }

      let userDetails = {
        firstName: user?.firstName,
        lastName: user?.lastName,
        mobile: user?.mobile,
        email: user?.email
      };

      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
      await UserModel.createUserToken({ userId: user._id, token });
      userDetails.token = token;

      return res.handler.success("User has been logged in successfully!", userDetails);
    } catch (error) {
      return res.handler.serverError(error);
    }
  }

  async getUserProfile(req, res) {
    try {
      const user = await UserModel.findUser({ _id: req.userId });
      let data = {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        mobile: user.mobile,
        email: user.email
      }

      return res.handler.success("User profile has been fetched successfully!", data);
    } catch (error) {
      return res.handler.serverError(error);
    }
  }
}

const userController = new UserController();
export default userController;