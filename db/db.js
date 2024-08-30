import mongoose from 'mongoose';

const Connection = async(USERID, PWD)=>{
    const URL = `mongodb+srv://${USERID}:${PWD}@cluster0.d9i4m.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
    try {
        await mongoose.connect(URL);
        console.log("database connected successfully");
    } catch (error) {
        console.log("error in connecting to the db ", error.message);
    }
}

export default Connection;