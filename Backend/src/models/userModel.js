import User from "../database/schemas/user.js";
import UserToken from "../database/schemas/userToken.js";

class UserModel {
  async findUser(query) {
    return await User.findOne(query);
  }

  async createUser(body) {
    return await User.create(body);
  }

  async createUserToken(body) {
    return await UserToken.create(body);
  }
}

const userModel = new UserModel();
export default userModel;