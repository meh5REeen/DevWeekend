import jwt from "jsonwebtoken";

//find the token from cookie and add it to the request body

const userAuth = async (req,res,next) => {
    const {token} = req.cookies;
    req.body = req.body || {};
    if(!token){
        return res.json({success:false,message:"not authorized login again"});

    }

    try{
        // decode the token
       const tokenDecode =  jwt.verify(token,process.env.JWTSECRET);

        console.log("token decode"+tokenDecode.id);
       if(tokenDecode.id){
            req.body.userId = tokenDecode.id;
       }
       else{
        return res.json({success:false,message:"Not authorized login againn"});
       }
       next();
    }
    catch(error){
        res.json({success:false,message:error.message});
    }
}
export default userAuth;