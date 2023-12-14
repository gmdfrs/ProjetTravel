import Hotel from "../models/Hotel.js";
import Room from "../models/Room.js";
import { creatError } from "../utils/error.js";


export const createHotel = async (req,res,next)=>{
    
    const newHotel = new Hotel(req.body)
    try{
        const savedHotel = await newHotel.save();
        res.status(200).json(savedHotel);

    }catch(err){
        next (err);
    }
}
// 
export const updatedHotel = async (req,res,next)=>{
    try{
        const updatedHotel = await Hotel.findByIdAndUpdate(
            req.params.id,
            {$set:req.body},
            {new:true}
            );
        res.status(200).json(updatedHotel);
    }catch(err){
        next(err);
    }
}

export const deleteHotel = async (req,res,next)=>{
    
    try{
        await Hotel.findByIdAndDelete(req.params.id);
       res.status(200).json("Hoel has been deleted");

   }catch(err){
       next(err);
   }
}

export const getHotel = async (req,res,next)=>{
    try{
    const hotel = 
       await Hotel.findById(req.params.id);
       res.status(200).json(hotel);
   }catch(err){
      next(err);
   }
}

export const getHotels = async (req,res,next)=>{
    const {min,max, ...others } = req.query;
    try{
        const Hotels = 
        await Hotel.find({...others,cheapestPrice: {$gt:min | 1,$lt: max || 999},
         }).limit(req.query.limit);
        res.status(200).json(Hotels);

    }catch(err){
        next(err)
    }
}

export const countByCity = async (req,res,next)=>{
    const cities = req.query.cities.split(",")
    try{
        const list = Promise.all(cities.map(city=>{
            return Hotel.countDocuments({city:city})
        }))
        await Hotel.find();
        res.status(200).json(list);

    }catch(err){
        next(err)
    }
}

export const countByType = async (req,res,next)=>{
     try{
    const hotelCount = await Hotel.countDocuments({type:"hotel"});
    const apatymentCount = await Hotel.countDocuments({type:"apartment"});
    const resortCount = await Hotel.countDocuments({type:"resto"});
    const villaCount = await Hotel.countDocuments({type:"villa"});
    const cabinCount = await Hotel.countDocuments({type:"cabin"});
   
    
     res.status(200).json([
        {type:"hotel",cont:hotelCount},
        {type:"aprtments",cont:apatymentCount},
        {type:"restos",cont:resortCount},
        {type:"villas",cont:villaCount},
        {type:"cabins",cont:cabinCount},
     ]);

    }catch(err){
        next(err);
    }
};


export const getHotelRooms = async (req,res,next)=>{
    
    try{
        const hotel =  await Hotel.findById(req.params.id)
        const list = await Promise.all(hotel.rooms.map(room=>{
            return Room.fondById(room)
        })
        );
        res.status(200).json(list)

    }catch(err){
        next(err);
    }
}

