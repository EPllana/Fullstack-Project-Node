import Tour from "./tour.model.js";

export const createTour = async (req, res) => {
  try {
    // const title = req.body.title
    // console.log("ne rregull");
    const {  title, description,  location, country, city, price, averageReating, createdBy, } = req.body;

    const tour = new Tour({// shembulli 2 me shkurt const tour = new Tour(req.body)
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
      const {search, country, city ,sortBy} = req.query; //ktu i kem filterat qa kem em filtru  qkado qe vendosim ne postman mbas ? esht query 
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;

      let filter = {isActive: true};

      if(search){
        filter.$or = [  
        {title:{$regex:search, $options:"i" }},
        {description:{$regex:search, $options:"i" }},

        ];
      }

    if(country){
      filter.country = country;
    }

    if(city){
      filter.city = city;
    }
    //sort nga qmimi
    let sortOptions = {createdAt: -1};
    if(sortBy === "price"){
      sortOptions = {price: -1}
    }else if (sortBy ==="price-desc"){
      sortOptions = {price:-1};

    }
    //detyr averagerating me bo me filter 

   
      const skip = (page-1)*limit // formila per me kalkulu skipin 
        const tours = await Tour.find(filter).skip(skip).limit(limit);// me - nuk i merr//selectin kur dojm mi thirr kon dojm---/-1 i thirr t fundit qe jon kriju i qet tparat.select("-password shembull")
        const totalDocuments = await Tour.countDocuments(filter)
        res.status(200).json({
          length:tours.length,
          totalDocuments: totalDocuments,
          data:tours,
        })
    }catch(error){
        console.log(error)
        res.status(500).json({message:"servero deshtori", error})
      
    }
}


export const getOneTour = async (req, res) => {
  try {
    const tourId = req.params.id;
    console.log("Requested tour ID:", tourId); // 👈 kjo ndihmon
    const tour = await Tour.findById(tourId).populate(
      "createdBy", "firstName lastName"
    );

    if (!tour) {
      return res.status(404).json({ message: "Tour not found" });
    }

    res.status(200).json(tour);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};


export const deleteTour = async (req, res) => {
    try{
        const tourId = req.params.id;
        const tour = await Tour.findByIdAndUpdate(tourId, {isActive: false})/// mos mu fshi po mubo veq false ne dtb 
        res.status(200).json({message:"tour u fshi me sukses"})

    }catch(error){
        res.status(500).json({message:"gabim ne server "})

    }
}

export const updateTour = async (req ,res)=>{
    try{
        const tourId = req.params.id;
        const{ title, description, location, country, city, price, } = req.body;
        const tour = await Tour.findById(tourId);// tour e kem ktu 
        if (!tour){
            return res.status(404).json({message:"tour not found"});
          }
          if (title) tour.title = title;// qka ka bo provide nga body nese eka gjet titullin nga tour tour  e kemi lart titulli aktual = me titullin e ri 
          if (description) tour.description = description;
          if (location) tour.location = location;
          if (country) tour.country = country;
          if (city) tour.city = city;
          if (price) tour.price = price;

        await tour.save()
        res.status(200).json({message:"tour updated succefully",tour});
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "serveri deshtoi", error });
      }
    };
  
