import User from "./user.model.js";
import bcrypt from "bcrypt";
import { sendWelcomeEmail } from "../../config/email.js";
import {sendVerifyEmail} from "../../utils/sendVeifyEmail.js"
import jwt from "jsonwebtoken";


export const createUser = async (req, res) => {
  try {
    // Marrim të dhënat nga kërkesa POST
    const { firstName, lastName, email, password, phoneNumber, role } = req.body;
    const existingUser =  await User.findOne({ email }).sort({ createdAt: -1 });    // Kontrollojmë në databazë nëse ekziston ndonjë user me email të njëjtë
    if (existingUser) {
      return res.status(400).json({ message: "User Exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);    // Bëjmë hash të fjalëkalimit me bcrypt me saltRounds=10 për siguri
    const user = new User({    // Krijojmë një user të ri me të dhënat e pranuara dhe fjalëkalimin e hash-uar
      firstName,
      lastName,
      email,
      role:role || "user",
      password: hashedPassword,
      phoneNumber, // Kujdes që emri i fushës të jetë i njëjtë me atë në model
    });
    await user.save();    // Ruajmë user-in në databazë (MongoDB)
    await sendVerifyEmail(user.email, user._id); // Dërgon email për verifikim
    res.status(201).json({message:"User Created Succefully Check Your Email ",});
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


export const loginUser = async(req,res)=>{
  try{
    const { firstName, lastName, email, password, phoneNumber, } = req.body;
    const user = await User.findOne({email})
    if(!user){
      return res.status(404).json({message:"Invalid credentials"})
    }
    const isMatch = await bcrypt.compate()
  }catch(error){

  }
}

export const getAllUsers = async (req, res)=>{
  try{
    const search = req.query.search //qkado qe tbojm n query prej frontit vjen string edhe boolean numrat vin string kshtu qe duhet tek page duhet me konvertu n numer

    const page = parseInt(req.query.page) || 1 // ktu e bojm pagination ne cilen flet jem  sa duhet me i skip per me i mar 10 userat e 1 10 te dytyiy-paese int e kthen ne numer 
    const limit = parseInt(req.query.limit) || 10  // nese ska bo provide useri me i marr d

    const skip = (page - 1) * limit;// nse ejem fleten e 2 2-1  skipi i shton 10 t part  nese jena fleten e 2 skipi 10 t paret nese jena n fleten e 3 skipi 10 te  dytit ? 

    let filter = {isActive:true};//empty object {} ktu jem tu e bo search 
    //aktive tru sna vjen niher see ekan undefinded

    if(search){// nese filteri eka dergu search\
      filter.$or = [
        { firstName: { $regex: search, $options: "i" } }, //array per meshum field me filtru
          {lastName:{$regex:search, $options: "i"}},
          {email: {$regex:search, $options:"i"}}]
     /* filter = {
      firstName:{
        $regex: search,
        $options: "i"
      }//duhet me perdor regular expressions per search  $option:"i" perdoret kur n search kerkojm se kqyr a o shkronja e madhe apo e vogel 
    }*/
  }

    const users = await  User.find(filter).select("-password").sort({createdAt:-1}).limit(limit).skip(skip);// kur kemi me marr seene prej databases mja kthy me await  te sort i sortojm mja nis prej numrit 
    const totalDocuments = await User.countDocuments(filter)
    res.status(200).json({
      length:users.length,
      data:users,
      totalDocuments: totalDocuments
    });
// ne postman e bojm me ? per query  
// kur sedim sa page kem me i bo me i nimu frotntit per pagination ja dergojm nr total t userave  dhe sa e bon aj limitin per 10 vet ne faqe apo sa 
//per me kalkulu n front sa fletakan me ieshfaq me count document
  }catch(error){
    res.status(500).json({message:"server errorrrrii", error:error})
  }
};

//=====================================================getOneUser========================================================///

export const getOneUser = async(req,res)=>{
  try{
      const userId = req.params.id;
      const user =await User.findById(userId).select("-password")
      if(!user){
          return res.status(404).json({message:"User not found"});
      }
      res.status(200).json(user)

  }catch(error){
    res.status(500).json({messae:"serveri error", error})
  }
};


//=====================================================getMe========================================================///

export const getMe = async(req,res)=>{
  try{
      const userId = req.user._id;
      const user =await User.findById(userId).select("-password")
      if(!user){
          return res.status(404).json({message:"User not found"});
      }
      res.status(200).json(user)

  }catch(error){
    res.status(500).json({messae:"serveri error", error})
  }
};


//=====================================================updateUser========================================================///

export const updateUser = async (req, res)=>{
  try{
   // const {id}=req.params;
   const userId = req.params.id;
   const {firstName,lastName,email,phoneNumber,role}=req.body;
   const user = await User.findById(userId);
   if (!user){
    return res.status(404).json({message:"User not found"});
  }
  if(firstName) user.firstName = firstName;
  if(lastName) user.lastName = lastName;
  if(email) user.email = email;
  if(phoneNumber) user.phoneNumber = phoneNumber;
  if(role) user.role = role;  // ktu ja jepum veq e bojm update me kejt dhe tek paraemter req.user._id edhe ka n fund if role kta e hjekum krjt mos meeeditu rolin e vetes ky mos mepat mundsi 

  await user.save()
  res.status(200).json({message:"user updated succefully"})
  }catch(error){
    res.status(500).json({message:"serveri error", error})

  }
  };



//=====================================================UpdateMe========================================================///

  export const updateMe = async (req, res)=>{
    try{
     // const {id}=req.params;
    // const userId = req.params.id;
    const userId = req.user._id; 
     const {firstName,lastName,email,phoneNumber,role}=req.body;
     const user = await User.findById(userId);
     if (!user){
      return res.status(404).json({message:"User not found"});
    }
    if (req.user._id !== userId) {
      return res.status(403).json({ message: "Nuk mund të përditësoni të dhënat e përdoruesve të tjerë." });
    }
    
    if(firstName) user.firstName = firstName;
    if(lastName) user.lastName = lastName;
    if(email) user.email = email;
    if(phoneNumber) user.phoneNumber = phoneNumber;
  
    await user.save()
    res.status(200).json({message:"user updated succefully"})
    }catch(error){
      res.status(500).json({message:"serveri error", error})
  
    }
    };

//=====================================================deleteUser========================================================///

export const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id; 
    const user = await User.findByIdAndUpdate(userId, {isActive: false});

    if (!user) {
      return res.status(404).json({ message: "User not found" });

    }

    res.status(200).json({ message: "User u fshi me sukses" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};


//=====================================================deleteMe========================================================///

export const deleteMe = async (req, res) => {
  try {
    const userId = req.user._id; 
    const user = await User.findByIdAndUpdate(userId, {isActive: false});

    if (!user) {
      return res.status(404).json({ message: "User not found" });

    }

    res.status(200).json({ message: "User u fshi me sukses" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};



//=====================================================changePassword========================================================///

export const changePassword  = async(req, res)=>{
  try{
    //marrim params id 
    const userId = req.user._id;// ktu ekem pat req.params.id ekem tookenin tash e bojm req,user._id veq qaj qe edin pasin e ndrron pasin jo tjeterkuj smundet kerkush
    const {oldPassword,newPassword} = req.body;

    //kontrollojm nese jan old pass word dhe new nese sjtan e kthejm nje status qe duhet t jen
    if(!oldPassword || !newPassword){return res.status(400).json({message:"Old Password And New Password Required"})}

    // megjet userin me id 
    const user = await User.findById(userId)
    if(!user){ return res.status(400).json({message:"User doesnt exist"})}

    //e bejm compare passin e vjeter me t riun 
    const isOldPasswordVlaid = await bcrypt.compare(oldPassword, user.password)

    // nese nuk ekziston pasi i vjeter smundet me shtu triun 
    if(!isOldPasswordVlaid){return res.status(400).json({message:"Old Password Not Validd"})}


     // bejm hashimin e passwordit t ri 
    const hashedPassword = await bcrypt.hash(newPassword, 10)
    user.password = hashedPassword;
   //e rujm userin ne dtb 
    await user.save();
    res.status(200).json({message:"Password Changed Succefully"})
    


  }catch(error){
  res.status(500).json({message:"Serveri Deshtoi", error})

  }
}


export const verifyEmail = async (req, res) => {
  const { token } = req.query;

  if (!token) {
    return res.status(400).json({ message: "Tokeni është i nevojshëm" });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY); // Verifikon tokenin

    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(404).json({ message: "Përdoruesi nuk u gjet" });
    }

    if (user.isVerified) {
      return res.status(400).json({ message: "Email-i is Verified" });
    }

    user.isVerified = true; // Shto një fushë "isVerified" në modelin e përdoruesit për të mbajtur gjurmë të statusit të verifikimit
    await user.save();

    await sendWelcomeEmail(user.email, user.firstName);

    res.status(200).send(`<h2>Email Verified!</h2> 
    <p>Thank you, <strong>${user.firstName} ${user.lastName}</strong>. Your email has been verified successfully.</p>`);  
  } catch (error) {
    console.log("Gabim gjatë verifikimit të tokenit:", error);

    res.status(400).json({ message: "Token i pavlefshëm ose i skaduar" });
  }
};
