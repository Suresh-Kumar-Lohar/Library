import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config()
const dbName = process.env.DB_NAME;

// BUILD A CONNECTION
mongoose
  .connect(process.env.MONGODB_URL, {
    dbName,
  })
  .then(() => {
    console.log(
      chalk.greenBright(
        `${chalk.white.bold(
          dbName
        )} database connected successfully ${chalk.yellow.bold(
          ":)"
        )} \n`
      )
    );
  })
  .catch((err) => console.log(`${chalk.red.bold("error : ", err)}`));

if (process.env.ENVIRONMENT === "development") {
  mongoose.set("debug", true);
}

export default mongoose;