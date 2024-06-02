import { Request, Response } from 'express';
import Fertilizer from '../models/Fertilizer';



export const createFertilizer = async (req: Request, res: Response) => {
  const { name, compatibleSeeds,price } = req.body;
  const newFertilizer = new Fertilizer({ name, compatibleSeeds,price });

  try {
    const savedFertilizer = await newFertilizer.save();
    res.status(201).json(savedFertilizer);
  } catch (error) {
    res.status(500).json({ message: 'Error adding fertilizer', error });
  }
};



export const getFertilizer = async (req: Request, res: Response) => {
  try {
    const fertilizers = await Fertilizer.find();
    res.status(200).json(fertilizers);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching fertilizers', error });
  }
};

export const deleteFertilizer = async (req: Request, res: Response) => {
  try {
    await Fertilizer.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Fertilizer deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting fertilizer', error });
  }
};