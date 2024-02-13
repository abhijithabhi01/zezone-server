
const multer = require('multer')

const storage = multer.diskStorage({
    destination:(req,file,callback)=>{
        callback(null,'./UserPosts')
    },
    filename:(req,file,callback)=>{
        const filename = `ZEZONE-${Date.now()}-${file.originalname}`
        callback(null,filename)
    }
})

const fileFilter = (req,file,callback)=>{
    if(file.mimetype ==='image/png' || file.mimetype ==='image/jpeg' || file.mimetype === 'image/jpg' || file.mimetype === 'video/mp4'){
        callback(null,true)
    }
    else{
        callback(null,false)
        return callback(new Error("Only jpg,JPEG & png files are allowed"))
    }
  
}

const multerConfig = multer({
    storage,
    fileFilter
})

module.exports = multerConfig