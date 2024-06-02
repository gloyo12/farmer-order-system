import { Request, Response } from 'express';
import {FarmerOrder} from '../models/FarmerOrder';
import Fertilizer from '../models/Fertilizer';



export const createOrder = async (req: Request, res: Response) => {
  const { farmerName, landSize, fertilizer, seed, fertilizerQuantity, seedQuantity,totalAmount } = req.body;


  if (!fertilizer && !seed) {
    return res.status(400).json({ message: 'At least one of fertilizer or seed must be provided' });
  }


  if (fertilizer && fertilizerQuantity > landSize * 3) {
    return res.status(400).json({ message: 'Fertilizer quantity exceeds limit based on land size' });
  }

  if (seed && seedQuantity > landSize * 1) {
    return res.status(400).json({ message: 'Seed quantity exceeds limit based on land size' });
  }

if (fertilizer && seed) {
const fertilizerDoc = await Fertilizer.findOne({ name: fertilizer });
if (!fertilizerDoc || !fertilizerDoc.compatibleSeeds.includes(seed)) {
return res.status(400).json({ message: 'Selected fertilizer is not compatible with selected seed' });
}
}

 
 

  try {
    const newOrder = new FarmerOrder({ farmerName, landSize, fertilizer, seed, fertilizerQuantity, seedQuantity,totalAmount });
    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Server error' });
  }
};




export const getOrders = async (req: Request, res: Response) => {
try {
const page = parseInt(req.query.page as string) || 1; 
const limit = parseInt(req.query.limit as string) || 5; 

const skip = (page - 1) * limit; 

const orders = await FarmerOrder.find()
.sort({ farmerName: 1 })
.skip(skip)
.limit(limit);

const totalOrders = await FarmerOrder.countDocuments();
const totalPages = Math.ceil(totalOrders / limit); 

res.status(200).json({
orders,
totalPages,
currentPage: page
});
} catch (error) {
res.status(500).json({ message: 'Server error' });
}
};




export const updateOrderStatus = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!['approved', 'rejected'].includes(status)) {
    return res.status(400).json({ message: 'Invalid status' });
  }

  try {
    const order = await FarmerOrder.findByIdAndUpdate(id, { status }, { new: true });
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};