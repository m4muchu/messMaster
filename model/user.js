const mongoose=require('mongoose');
const bcrypt=require('bcrypt-nodejs');

var userSchema=new mongoose.Schema({
    messNumber:{
        type:Number,
        required:true,
        unique:true
    },
    name:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
},{
    collection:'OBCUSers'
});

userSchema.methods.hashPassword=function(password){
    return bcrypt.hashSync(password,bcrypt.genSaltSync(8),null);
};

userSchema.methods.validPassword=function(password){
    return bcrypt.compareSync(password,this.password);
};

module.exports=mongoose.model('User',userSchema);
