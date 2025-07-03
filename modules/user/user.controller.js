import User from "./user.model.js";
import bcrypt from "bcrypt";

export const createUser = async (req, res) => {
  try {
    // Marrim të dhënat nga kërkesa POST
    const { firstName, lastName, email, password, phoneNumber } = req.body;

    // Kontrollojmë në databazë nëse ekziston ndonjë user me email të njëjtë
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      // Nëse ekziston, kthejmë gabim 400 me mesazh
      return res.status(400).json({ message: "User me kete email ekziston" });
    }

    // Bëjmë hash të fjalëkalimit me bcrypt me saltRounds=10 për siguri
    const hashedPassword = await bcrypt.hash(password, 10);

    // Krijojmë një user të ri me të dhënat e pranuara dhe fjalëkalimin e hash-uar
    const user = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      phoneNumber, // Kujdes që emri i fushës të jetë i njëjtë me atë në model
    });

    // Ruajmë user-in në databazë (MongoDB)
    await user.save();

    // Nëse u ruajt me sukses, kthejmë status 201 dhe user-in e krijuar (mund ta filtrosh për mos t'u kthyer fjalëkalimi)
    res.status(201).json({message:"useri u krijua me sukses",});
  } catch (error) {
    // Në rast gabimi, kthejmë status 400 dhe mesazhin e gabimit
    res.status(400).json({ message: error.message });
  }
};

export const getAllUsers = async (req, res)=>{
  try{
    const users = await  User.find().select("-password".sort({createdAt:-1}))// kur kemi me marr seene prej databases mja kthy me await  te sort i sortojm mja nis prej numrit 
    res.status(200).json({
      data:users,
      length:users.length,
    });

  }catch(error){
    res.status(500).json({message:"server error", error:error})
  }
}

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
}
export const updateUser = async (req, res)=>{
  try{
   // const {id}=req.params;
   const userId = req.parmas.id;
   const {firstName,lastName,email,phoneNumber,}=req.body;
   const user = await User.findById(userId);
   if (!user){
    return res.status(404).json({message:"User not found"});
  }
  if(firstName){
    user.firstName = firstName;

  }
  if(lastName){
    user.lastName = lastName;
    
  }
  if(email){
    user.email = email;
    
  }
  if(phoneNumber){
    user.phoneNumber = phoneNumber;
    
  }
  await user.save()
  res.status(200).json({message:"user updated succefully"})
  }catch(error){
    res.status(500).json({messae:"serveri error", error})

  }
  }

export const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id; 
    const user = await User.findByIdAndDelete(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User u fshi me sukses" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
