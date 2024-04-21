const express = require('express');
const path = require("path")
const app = express()
const PORT = 8080
const productsRouter = require("./routes/products.js")
const cartsRouter = require("./routes/carts.js")


app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.use("/api", productsRouter)
app.use("/api", cartsRouter)



app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
})
