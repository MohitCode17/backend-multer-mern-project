import mongoose from "mongoose";

mongoose.set("strictQuery", false);

const connectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URL, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        });
        console.log(`Database connected 🚀`)
    }catch(error){
        console.log(`Error while connect with DB : ${error}`);
    }
};

export default connectDB;