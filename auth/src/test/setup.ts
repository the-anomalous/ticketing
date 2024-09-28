import {MongoMemoryServer} from 'mongodb-memory-server'
import mongoose from 'mongoose'
import {app} from '@/app'

let mongodb:any; 

beforeAll(async () => {
    process.env.JWT_KEY = 'asdf'

    mongodb = await MongoMemoryServer.create() 
    const mongoURI = mongodb.getUri()
    await mongoose.connect(mongoURI, {})
})

beforeEach(async () => {
    if (mongoose.connection.db) {
        const collections = await mongoose.connection.db.collections() 
        
        for (let i = 0; i < collections.length; i++) {
            collections[i].deleteMany({})
        }
    }

})

afterAll(async () => {
    if (mongodb) {
        await mongodb.stop()
    }
    await mongoose.connection.close()
})