import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();


const secret =  process.env.SECRET;

const auth = async (req, res, next) => {

    try {
        const token = req.headers.authorization.split(" ")[1]; 
        let decodedData;

        decodedData = jwt.verify(token , secret);
      
        if(decodedData?.email){
         next();
        }

    } catch (error) {
        res.status(500).json({ message: "Something went wrong. Please try again later" });
    }
}


export default auth;