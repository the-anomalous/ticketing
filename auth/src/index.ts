import 'tsconfig-paths/register';
import mongoose from 'mongoose'  
import {app} from '@/app'

const PORT = 3000

const start = async () => {
    if (!process.env.JWT_KEY) {
        throw new Error("Cannot find JWT_KEY")
    }

    const uri = 'mongodb://auth-mongo-srv:27017'
    try {
        await mongoose.connect(uri)
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error(err);
    }

    app.listen(PORT, () => {
        console.log(`listening on PORT:${PORT}`);  
    })
}

start()