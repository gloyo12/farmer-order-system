import { Request, Response } from 'express';
import Seed from '../models/Seed';



export const createSeed = async (req: Request, res: Response) => {
  const { name,price } = req.body;
  const newSeed = new Seed({ name,price });

  try {
    const savedSeed = await newSeed.save();
    res.status(201).json(savedSeed);
  } catch (error) {
    res.status(500).json({ message: 'Error adding seed', error });
  }
};



export const getSeed = async (req: Request, res: Response) => {
  try {
    const seeds = await Seed.find();
    res.status(200).json(seeds);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching seeds', error });
  }
};

export const deleteSeed = async (req: Request, res: Response) => {
  try {
    await Seed.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Seed deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting seed', error });
  }
};