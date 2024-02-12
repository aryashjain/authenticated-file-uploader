import { User ,validation} from "../models/user.js";
import bcrypt from "bcrypt";
import {getUser, setUser} from "../service/auth.service.js"

async function handleSignUp(req, res) {
    try{
    const { error } = validation(req.body);
		if (error)
			return res.status(400).send({ message: error.details[0].message });

    const { firstName, lastName, email, password} = req.body;
    console.log(firstName, lastName, email, password)
    const user = await User.findOne({ email });
    if (user) {
        return res.status(409).send({ message: "User with given email already Exist!" });
    }
    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashPassword = await bcrypt.hash(req.body.password, salt);
    await  User.create({
        firstName,
        lastName,
        email,
        password: hashPassword,
    });
    return res.send("user signed in");
} catch(err){
   res.status(500).send({ message: "Internal Server Error" });
}
}

async function handleLogin(req, res) {
    try{
    // const { error } = validate(req.body);
	// 	if (error)
	// 		return res.status(400).send({ message: error.details[0].message });

    const {email, password} = req.body;
    const user = await  User.findOne({
        email,
    });
   //console.log(user, email, password)
    if(!user)
    return res.status(401).send({ message: "Invalid Email or Password" });
	const validPassword = await bcrypt.compare(
			password,
			user.password
		);
    console.log(password,user.password,validPassword)   
	if (!validPassword)
		return res.status(401).send({ message: "Invalid Email or Password" });

        const token = user.generateAuthToken();
    
		res.status(200).send({ data: token, message: "logged in successfully" });
	} catch (error) {
        console.log(err)
		res.status(500).send({ message: "Internal Server Error" });
	}
}


const validate = (data) => {
	const schema = Joi.object({
		email: Joi.string().email().required().label("Email"),
		password: Joi.string().required().label("Password"),
	});
	return schema.validate(data);
};
export {handleSignUp, handleLogin}