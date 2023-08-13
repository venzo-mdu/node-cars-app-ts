import { Request, Response } from "express";
import Cars, { ICar } from "../model/carModel";


export const approveCarsList = async (req: Request, res: Response) => {
    console.log("user id in car cont", req.user.id);
    console.log("user role", req.user.roles);
    // if(req.user.roles.toString() !== 'user'){
    try {
        const cars = await Cars.find({ status: 'pending' });
        console.log("cars is", cars);
        if (!cars) {
            console.log("no cars")
            res.status(404).json({ message: "No cars Found" })
        }
        res.status(200).json(cars);
    } catch (error) {
        console.log("error occured while fetching cars", error);
        res.status(500).json({ message: "Error occured while fetching data" })
    }
    // }
    // else{
    //     res.status(401).json({message:"Unauthorized access"})
    // }
}

export const approveCars = async (req: Request, res: Response) => {
    console.log("car id", req.params.id);
    const carId = req.params.id;
    try {
        const cars = await Cars.findByIdAndUpdate(
            carId,
            { $set: { status: 'checked' } },
            { new: true }
        ) as ICar;

        if (!cars) {
            console.log('No car available with given id');
            res.status(404).json({ message: "No car available with given id" })
        }
        //   cars.status:any = status;
        //   await cars.save();
        console.log('car updated:', cars);
        res.status(200).json({ message: "car updated:", cars })

    } catch (err) {
        console.log("error occured while updating cars", err);
        res.status(500).json({ message: "Error occured while updating data" })
    }
}