import { Request, Response } from "express";
import Cars from "../model/carModel";

export const approveCarsList = async (req: Request, res: Response) => {
    console.log("user id in car cont", req.user.id);
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
}

export const approveCars = async (req: Request, res: Response) => {
    console.log("car id", req.params.id);
    const userId = req.params.id;
    const status = 'checked';
    try {
        // const cars = await Cars.findByIdAndUpdate(userId);

        const cars = await Cars.findOneAndUpdate(
            { id: userId },
            { $set: { status: 'checked' } },
            { new: true }
        );
        if (!cars) {
            console.log('no cars is in pending');
            res.status(404).json({ message: "no cars in pending" })
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