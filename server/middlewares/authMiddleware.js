import jwt from "jsonwebtoken"

export default async(req, res, next) =>{
    try {
        const authHeader = req.header('Authorization');
        console.log(authHeader);
        const token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
        if(err){
            console.log(err)
            return res.status(200).send({
                message:"Authorization Failed1",
                success: false
            })
        }
        else{
            req.body.userId = decode.id ;
            next()
        }
    })
    } catch (error) {
        console.log(error);
        res.status(401).send({
            message:"Authorization Failed2",
            success: false
        });
    }
}