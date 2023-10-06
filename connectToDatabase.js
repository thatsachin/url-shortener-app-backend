import mongoose from "mongoose";

const connectToDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log(`Database is Connected!`);
    }
    catch(error) {
        console.log(`Error Occured in connectToDatabase: ${error}`);
    }
}

export default connectToDatabase;