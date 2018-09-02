const mongoose=require('mongoose');

var lateMess=new mongoose.Schema({
    messNumber:{
        type:Number,
        required:true
    },
    date:{
        type:String,
        required:true
    }
},{
    collection:'OBCLateMess'
});


module.exports=mongoose.model('LateMess',lateMess);