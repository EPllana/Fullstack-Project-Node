import User from "./user.model.js";
import bcrypt from "bcrypt";
import { sendWelcomeEmail,sendVerificationEmail } from "../../config/email.js";
import crypto from "crypto";


export const createUser = async (req, res) => {
  try {
    const { name, surname, email, password, role, phoneNumber } = req.body;

    // Kontrollo nëse përdoruesi ekziston
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    if (!password) {
      return res.status(404).json({ message: "Password Required" });
    }

    // Krijo tokenin e verifikimit
    const verificationToken = crypto.randomBytes(32).toString("hex");

    // Krijo përdoruesin e ri
    const newUser = new User({
      name,
      surname,
      email,
      password: hashedPassword,
      role: role || "user",
      phoneNumber,
      verificationToken,
      isVerified: false
    });

    // Ruaj përdoruesin në databazë
    await newUser.save();

    // Dërgo email për verifikimin e email-it
    await sendVerificationEmail({
      email: newUser.email,
      name: newUser.name,
      verificationToken
    });

    res.status(201).json({ message: "User created successfully. Check your email to verify." });

  } catch (error) {
    console.error("Register Error:", error.message);
    res.status(500).json({ message: "Registration failed" });
  }
};
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
  try {
    const { token } = req.query;  // Merr tokenin nga query params

    if (!token) {
      return res.status(400).json({ message: "Token is required" });
    }

    // Gjej përdoruesin përmes tokenit të verifikimit
    const user = await User.findOne({ verificationToken: token });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    // Përdoruesi është verifikuar
    user.isVerified = true;
    user.verificationToken = null; // Pas verifikimit, mund ta fshish tokenin
    await user.save();

    res.status(200).send(`<h1>Email Verified!</h1>
      <p>Thank you, <strong>${user.name}</strong>. Your email has been verified successfully.</p>`);

  } catch (error) {
    console.error("Email verification error:", error);
    res.status(500).json({ message: "Verification failed" });
  }
};