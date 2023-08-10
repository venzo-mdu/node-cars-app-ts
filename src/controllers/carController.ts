import { Request, Response } from "express";
import Cars, { ICar } from "../model/carModel"
// import { RequestHandler } from "express";

export const getAllCars = async (req: Request, res: Response) => {
    // console.log("inside controller ")
    try {
        const cars = await Cars.find();
        if (!cars) {
            console.log("no cars")
            res.status(404).json({message:"No cars found"})
        }
        res.status(200).json(cars);
    } catch (err) {
        console.log("error occured while getting cars", err);
        res.status(500).json({ message: "Error occured while fetching data" })
    }

}

export const getMyCars = async (req: Request, res: Response) => {
    // console.log("inside controller ")
    console.log("user id in car cont",req.user.id);
    try {
        const cars = await Cars.find({ user_id: req.user.id });
        console.log("cars is", cars);
        if (!cars) {
            console.log("no cars")
            res.status(404).json({message:"No cars Found"})
        }
        res.status(200).json(cars);
    } catch (err) {
        console.log("error occured while getting cars", err);
        res.status(500).json({ message: "Error occured while fetching data" })
    }

}

export const createCars = async (req: Request, res: Response) => {
    console.log(req.body);
    console.log("user id",req.user.id);
    const user_id = req.user.id;

    const { carname, model, year, price } = req.body;
    if (!carname || !model || !year || !price) {
        return res.status(400).json({ message: 'All fields are required' })
    }
    try {
        const cars: ICar = new Cars({
            user_id,
            carname,
            model,
            year,
            price
        });
        const savedCar = await cars.save();
        console.log("savedCar",savedCar)
        res.status(201).json(savedCar);
    } catch (err) {
        console.log("error occured while creating cars", err);
        res.status(500).json({ message: "Error occured while creating data" })
    }
}

export const updateCars = async (req: Request, res: Response) => {
    const { id } = req.params;
    const cars = await Cars.findById(id);
    if (!cars) {
        res.status(404).json({message:"No cars Found"})
    }
    if (!req.body) {
        return res.status(400).json({ message: "All Fields mandatory" })
    }
    if(cars.user_id.toString() !== req.user.id){
        res.status(403).json({message:"User dont't have permission to update other user details"});
    }

    try {
        const updateCars = await Cars.findByIdAndUpdate(
            id,
            req.body,
            { new: true }
        );
        res.json(updateCars);

    } catch (err) {
        console.log("error occured while update cars", err);
        res.status(500).json({ message: "Error occured while updating data" })
    }

}

export const deleteCars = async (req: Request, res: Response) => {
    const { id } = req.params;
    const cars = await Cars.findById(id);
    if (!cars) {
        res.status(404).json({message:"No cars found"});
    }
    if(cars.user_id.toString() !== req.user.id){
        res.status(403).json({message:"User dont't have permission to delete other user details"});
    }
    try {
        await Cars.findByIdAndRemove(id);
        res.json({ message: 'Deleted Successfully' });
    } catch (err) {
        console.log("error occured while delete cars", err);
        res.status(500).json({ message: "Error occured while deleting data" })
    }
}

