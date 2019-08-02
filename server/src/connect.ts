import mongoose from "mongoose";

type Input = {
  db: string;
};
export default ({ db }: Input) => {
  const connect = () => {
    mongoose
      .connect(db)
      .then(() => {
        return console.info(`Successfully connected to Mongodb`);
      })
      .catch(error => {
        console.error("Error connecting to database: ", error);
        throw new Error(error);
      });
  };
  connect();

  mongoose.connection.on("disconnected", connect);
};
