import mongoose from "mongoose";
export const ConnectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://ducluong500:10032003@cluster0.ptqta.mongodb.net/"
  );
  console.log("DB connected");
};
