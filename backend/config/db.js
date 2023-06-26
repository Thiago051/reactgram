const mongoose = require('mongoose')

// connection
const dbUser = process.env.DB_USER
const dbPassword = process.env.DB_PASS

const conn = async () => {
    try {
        const dbConn = await mongoose.connect(
            `mongodb+srv://${dbUser}:${dbPassword}@cluster0.auxykg7.mongodb.net/?retryWrites=true&w=majority`
        )
        console.log('conectou')
        return dbConn
    } catch (error) {
        console.log(error.message)
    }
}

conn()

module.exports = conn