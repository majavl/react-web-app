import mongoose from "mongoose";
const databaseConnection = async() => {
    try {
        await mongoose.connect('mongodb://localhost:27017/users');

        console.log('MongoDB connected at port: 27017');
    } catch (error){
        console.log('MongoDB connection error: ', error);
        process.exit(1);
    }
}

export default databaseConnection;