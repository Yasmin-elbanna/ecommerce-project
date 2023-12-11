const  mongoose  = require("mongoose");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const utli = require('util');
const asyncsign = utli.promisify(jwt.sign)

const schema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique:true,
        minLength:4
    },
    email: {
        type: String,
        required: true,
        unique: true,
         match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    fullname: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        match:[/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,15}$/,'Please fill a valid password'],  //special/number/capital 
        unique:true
    },
     address: {
        type: String,
        required: true
    },
    
    phoneNumber:{
         type:Number,
         match:[/^01[0125][0-9]{8}$/,'phone number not correct']

    },
    passwordChangedAt: Date,

    isAdmin:{
        type:Boolean,
        default:false,
    },

},{ timestamps: true });
schema.pre("save",async function(){
    if (this.isModified('password')) {
        const saltpass=15;
        const hashpass= await bcrypt.hash(this.password, saltpass)
        this.password = hashpass
    }
})
schema.methods.generateToken = function () {
    const token = asyncsign({
      id: this.id,
      email: this.email,
      isAdmin: this.isAdmin
    }, process.env.secretkey)
    return token
  }
  userShema=mongoose.model('project-itis',schema);
module.exports=userShema;
