const PORT = 9001
const URLDB = 'mongodb://127.0.0.1:27017'

const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const { secret } = require('./config')
const User = require('./models/User')
const Product = require('./models/Product')

const app = express()

app.use(cors())
app.use(express.json())

const generateAccessToken = (id) => {
    const payLoad = {
        id
    }
    return jwt.sign(payload, secret, {expiresIn: '24h'})
}

app.post('/registration', async (reg, res) =>{
    console.log(reg.body)
    const {login, password, email} = reg.body
    const user = new User({login, password, email})
    await user.save()
    res.json({
        message: 'Вы успешно зарегестрировались!'
    })
})

app.post('/login', async (reg, res) =>{
    console.log(reg.body)
    const {login,  password} = reg.body
    const user = await User.findOne({login})
    if (!user){
        return res.status(400).json({message: 'Пользователь не найден!'})
    }
    if (user.password != password){
        return res.status(400).json({message: 'Неверный логин или пароль!'})
   }
    const token = generateAccessToken(user._id)
    res.json({
        message: 'Вы успешно авторизованы!',
        token: token
    })
})

app.get('/products', async (reg, res) =>{
/*
    const products = [
        {id: 1, header: 'Товар 1', price: 120 },
        {id: 2, header: 'Товар 2', price: 3850 },
        {id: 3, header: 'Товар 3', price: 570 },
        {id: 4, header: 'Товар 4', price: 14360 },
        {id: 5, header: 'Товар 5', price: 98 },
        {id: 6, header: 'Товар 6', price: 734 },
        {id: 7, header: 'Товар 5', price: 98 },
        {id: 8, header: 'Товар 6', price: 734 },
      ]
*/

    const products = await Product.find()

    res.json({
         data: products
     })
})

const start = async () => {
    try {
        await mongoose.connect(URLDB)
        app.listen(PORT, () => console.log(`Сервер запущен на ${PORT} порте`))
    }catch (e) {
        console.log(e)
    }
}

start()