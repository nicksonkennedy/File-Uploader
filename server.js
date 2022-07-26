const express = require('express')
const fileUpload = require('express-fileupload')
const cors = require('cors')
const uuid = require('uuid')
const path = require("path");



const app = express()
app.use(fileUpload({
    createParentPath: true, // creates the directory path for mv() method when it doesn’t exist:

    limits: {
        fileSize: 1024 * 1024 // 1 MB
    },
    abortOnLimit: true
}))

//middle for parsing
app.use(express.json())
app.use(express.urlencoded({extended:false}))

//middleware for  connectivity between frontend and backend
app.use(cors())

//upload endpoint
app.post('/upload', (req, res)=>{
    if(req.files ===null){
        return res.status(400).json({msg: 'No File Selected'})
    }

    const file = req.files.file
    const extensionName = path.extname(file.name); // fetch the file extension
    const allowedExtension = ['.png','.jpg','.jpeg'];

     if(!allowedExtension.includes(extensionName)){
     return res.status(422).json({msg:'Invalid File Type Selected'});
    }

    file.mv(`${__dirname}/client/public/uploads/${file.name}`, err=>{
        if(err){
            console.log(err)
            return res.status(500).send(err)
        }
        res.json({fileName: file.name , filePath: `/uploads/${file.name}`})
    })
})

//Get uploads endpoi

app.listen(5000, ()=>console.log('Backend Server started On Port 5000.......'))