const mongoose=require('mongoose');

var messCutSchema=new mongoose.Schema({
    messNumber:{
        type:Number,
        required:true
    },
    from:{
        type:String,
        required:true
    },
    to:{
        type:String,
        required:true
    }
},{
    collection:'OBCMessCuts'
});

module.exports=mongoose.model('MessCut',messCutSchema);