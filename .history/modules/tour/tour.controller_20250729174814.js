import Tour from "./tour.model.js";

export const createTour = async (req, res) => {
  try {
    // const title = req.body.title
    // console.log("ne rregull");
    const {  title, description,  location, country, city, price, averageReating, createdBy, } = req.body;
    const image = req.file

    const tour = new Tour({// shembulli 2 me shkurt const tour = new Tour(req.body)
      title,
      description,
      location,
      country,
      city,
      price,
      averageReating,
      createdBy:userID,
      image,
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
      const {search, country, city ,sortBy} = req.query; //ktu i kem filterat qa kem em filtru  qkado qe vendosim ne postman mbas ? esht query queryt veq frontit vin params prej routes 
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
    console.log("Requested tour ID:", tourId); 
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
  
    export const getTourstats = async (req, res) => {
      try {
        // Merr numrin total të tureve që janë aktive
        const totalTour = await Tour.countDocuments({ isActive: true });
    
        // Merr statistika të çmimeve për turet aktive
        const priceStats = await Tour.aggregate([
          { $match: { isActive: true } }, // filtro vetëm turet aktive
          {
            $group: { // grumbullo të gjitha të dhënat në një grup të vetëm
              _id: null,
              avgPrice: { $avg: "$price" },     // mesatarja e çmimeve e kthen si numer me $ price kurse pa $ e kthen si  string
              minPrice: { $min: "$price" },     // çmimi minimal
              maxPrice: { $max: "$price" },     // çmimi maksimal
              totalRevenue: { $sum: "$price" }  // shuma totale e të gjitha çmimeve
            }
          }
        ]);
    
        const  toursByCountry = await Tour.aggregate([
          { $match: { isActive :true } },
          { $group : { _id:"$country", // i grupon rejt nga country 
            count: { $sum: 1 }, // posht e gjojm qmimin mesatar ne vende sa esht 
            avgPrice: { $avg: "$price" }        
          }}
        ]);
    
        const ratingStats =  await Tour.aggregate([
          { $match: { isActive: true } },
          { $group: {
            _id: null, // me null nuk i grupon nga asgje vetem i merr krejt qka ka 
            avgRating: { $avg: "$averageRating" },
            minRating: { $min: "$averageRating" },
            maxRating: { $max: "$averageRating" }
          }}
        ]);// me gjet rating ma t madh 
        
    
        res.status(200).json({
          totalTour: totalTour,
          priceStats: priceStats[0] || {
            avgPrice:0,
            minPrice:0, 
            maxPrice:0,
            totalRevenue:0 },// nese smundet me i gjet kto satistika me kthy 0 
    
          ratingStats : ratingStats[0] || {
            avgRating:0,
            minRating:0, 
            maxRating:0,
          },
    
          toursByCountry: toursByCountry, // sebojm akses me 0 se e kem id null nalt agregate gjithmon e kthen 1 array 
    
        })
      } catch(error) {
        res.status(500).json({message:"Server Error" , error})
      }
    }
    
// aggregate zakonisht i then ton kohen rezulatatet ne form te arrayt 




export const addReview = async (req, res) => {
  try {

    const tourId = req.params.tourId;
    const userId = req.user.id;
    const comment = req.body.comment;
    const rating = req.body.rating;

    // Gjejmë turin
    const tour = await Tour.findById(tourId);
    if (!tour) {
      return res.status(404).json({ message: "Tour not found" });
    }

    // Kontrollojmë nëse përdoruesi ka bërë tashmë review
    const existingReview = tour.reviews.find(
      (rev) => rev.user.toString() === userId.toString()
    );
    if (existingReview) {
      return res.status(400).json({ message: "Review already exists for this user" });
    }

    // Krijojmë një review të ri
    const newReview = {
      user: userId,
      comment,
      rating,
    };

    // Shtojmë review-n në listën e reviews
    tour.reviews.push(newReview);

    // Ruajmë turin dhe përditësojmë
    await tour.save();
    res.status(201).json({ message: "Review added successfully", tour });
  } catch (error) {
    console.error("Error during review addition:", error);  // Shtoni log për gabimin
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

/*
export const addReview = async (req, res)=>{
  try{
    const  tourId = req.params.tourId // kta e kemi tek route 
    const userId = req.body.user;    // ta e marrim nga body i postman 
     const comment = req.body.comment
     const rating = req.body.rating

     const tour = await Tour.findById(tourId);
     if(!tour){ return res.status(404).json({message:"Nuk ekzison"})}

     // e bojm 1 user me shtu vetem 1 review  jo mashum tour.reviews ekem si array ne model reviews
     const existingReview = tour.reviews.find(// masi jemi tu iteru me array e perdorim ket metod te js  kjo rev esht shkur revies
      (rev)=> rev.user.toString() === userId 
     );
      if(existingReview){
        return res.status(400).json({message:"Review Exists Could Not Add More Reviews"})
      } 

      const newReview = {
        user:user,
        comment:comment,
        rating:rating,
      }
      tour.reviews.push(newReview);  //reviews e kem si array ne schema
      await tour.save();
      res.status(201).json({message:"Review Addeded Succefully", tour})


  }catch(error){
    res.status(500).json({message:"Server Error", error})

  }
}
*/