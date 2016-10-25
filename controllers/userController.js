var express = require('express');
var router = express.Router();
var UserService = promise.promisifyAll(commonUtil.getService('user'));

router.post("/signUp",
    function(req,res,next){
        if(req.body.user_name && req.body.password) {
           UserService.findUserAsync({user_name:req.body.user_name})
           .then(function(user){
                if(user && user[0]){
                    return res.status(500).json({"status": "ERROR", "error_message": "User name already exists."});
                }else{
                    UserService.addUserAsync(req.body)
                    .then(function(added){
                        if(added){
                            return res.status(200).json({"status": "OK", "message": "User Added.", "data":added});
                        }
                    })
                }
           })
        }else {
            return res.status(500).json({"status": "ERROR", "error_message": "Please provide required data."});
        }
    }
);

router.post("/signIn",
    function(req,res,next){
        if(req.body.user_name && req.body.password) {
           UserService.findUserAsync({user_name:req.body.user_name})
           .then(function(user){
                if(user && user[0]){
                    if(user[0].password === req.body.password){
                       return res.status(200).json({"status": "OK", "message": "User matched.", "canLogin":true}); 
                    }else{
                        return res.status(500).json({"status": "OK", "message": "User not matched.", "canLogin":false}); 
                    }
                }else{
                    return res.status(500).json({"status": "OK", "message": "User not found.", "canLogin":false}); 
                }
           })
        }else {
            return res.status(500).json({"status": "ERROR", "error_message": "Please provide required data."});
        }
    }
);


module.exports = router;
