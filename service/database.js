import mongoose from "mongoose"

export default function DBConnect () {
    const mongodb = global.__mongodb__
    mongoose.connect(mongodb, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })

    const db = mongoose.connection
    db.on("error", console.error.bind(console, "connection error:"))
    db.once("open", () => {
        console.log("Connected to database")
    })
}

