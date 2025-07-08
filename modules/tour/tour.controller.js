import Tour from "./tour.model.js";

export const createTour = async (req, res) => {
  try {
    // const title = req.body.title
    // console.log("ne rregull");
    const {  title, description,  location, country, city, price, averageReating, createdBy, } = req.body;

    const tour = new Tour({
      title,
      description,
      location,
      country,
      city,
      price,
      averageReating,
      createdBy,
    });
    await tour.save();
    res.status(201).json({ message: "Tour created", tour });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Error creating Tour", error });
  }
};

export const getTour = async (req ,res)=>{
    try{

        const tours = await Tour.find().sort({createdAt: -1});// me - nuk i merr//selectin kur dojm mi thirr kon dojm---/-1 i thirr t fundit qe jon kriju i qet tparat.select("-password shembull")
        res.status(200).json(tours)
    }catch(error){
        console.log(error)
        res.status(500).json({message:"servero deshtori", error})
      
    }
}


export const getOneTour = async(req,res)=>{
    try{
        const tourId = req.params.id;
        const tour =await Tour.findById(tourId).populate(
            "createdBy",
            "firstName lastName" 
        )
        res.status(200).json(tour)
    }catch(error){
      res.status(500).json({message:"serveri error", error})
    }
  }; 

export const deleteTour = async (req, res) => {
    try{
        const tourId = req.params.id;
        const tour = await Tour.findByIdAndDelete(tourId)
        res.status(200).json({message:"tour u fshi me sukses"})

    }catch(error){
        res.status(500).json({message:"gabim ne server "})

    }
}
/*
export const updateTour = async (req ,res)=>{
    try{
        const tourId = req.params.id;
        const{ title, description,  location, country, city, price, averageReating, createdBy, } = req.body;
        const tour = await User.findById(tourId);
        if (!tour){
            return res.status(404).json({message:"tour not found"});
          }
        if(title) tour.title = title;
        if(description) tour.description = description;
        if(location) tour.location = location;
        if(country) tour.country = country;
        if(city) tour.city = city;
        if(price) tour.price = price;
        if(averageReating) tour.averageReating = averageReating;
        if(createdBy) tour.createdBy=createdBy;

        await tour.save()
      
    }catch(error){
        console.log(error)
        res.status(500).json({message:"serveri deshtori", error})
      
    }
*/