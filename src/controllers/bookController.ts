import { Request, Response } from "express";
import Cars, { ICar } from "../model/carModel";
import Book, { IBook } from "../model/bookModel";

export const bookCar = async (req: Request, res: Response) => {
    const { user_availability, contact_no } = req.body;
    const user_id = req.user.id;
    const cars: ICar | null = await Cars.findById(req.params.id);
    console.log(cars);
    if (!cars) {
        res.status(404).json({ message: "Car not Found" });
    }
    if (cars.user_id === user_id) {
        res.status(409).json({ message: "You can't book your own posted car" });
    }
    const isCarAlreadyBooked = await Book.exists({
        cars: cars,
        user_id: user_id,
        user_availability,
        contact_no
    })
    if (isCarAlreadyBooked) {
        return res.status(409).json({ message: "car is alread booked by you, check your boookings" })
    }
    try {
        const book: IBook | null = new Book({
            user_id,
            cars,
            user_availability,
            contact_no
        })
        const bookedCar = await book.save();
        console.log("savedCar", bookedCar)
        res.status(201).json(bookedCar);
    } catch (error) {
        console.log("error occured while booking cars", error);
        res.status(500).json({ message: "Error occured while booking data" })
    }
}

export const bookedCarList = async (req: Request, res: Response) => {
    const userId = req.params.id;
    console.log("user id", userId)
    try {
        if (userId !== req.user.id) {
            res.status(403).json({ message: "Token user id does not match" })
        }
        const bookedCars = await Book.find({ user_id: userId }).populate('cars');
        console.log("booked cars", bookedCars);
        if (bookedCars.length === 0) {
            return res.status(404).json({ message: 'No bookings found for this car.' });
        }
        // console.log(bookedCars);
        res.json(bookedCars);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Something went wrong' });
    }
}

export const myCarIsBooked = async (req: Request, res: Response) => {
    console.log("params id", req.params.id);
    const carId = req.params.id;
    const userId = req.user.id;
    const cars: ICar | null = await Cars.findById(carId);
    console.log(cars);

    //making route private 
    if (cars.user_id.toString() !== userId) {
        res.status(403).json({ message: "Token does not match, You can't see other persons car booking details" });
    }
    const bookedCars = await Book.find({ cars: carId }).populate('user_id', 'username').exec();
    // const bookedCars = await Book.find({ cars : carId });
    if (bookedCars.length === 0) {
        return res.status(404).json({ message: 'Wait!, still your car is not booked' });
    }
    console.log(bookedCars);
    res.status(200).json({ message: 'Your car is booked by the user:', bookedCars });
}


export const deleteBookedCars = async (req: Request, res: Response) => {
    console.log("params", req.params.id);
    const book: IBook | null = await Book.findById(req.params.id);
    console.log("booked car", book)
    if (!book) {
        res.status(404).json({ message: "No bookings found" })
    }

    // making route private
    if (book.user_id.toString() !== req.user.id) {
        res.status(403);
        throw new Error("User dont't have permission to delete other user bookings")
    }
    await Book.deleteOne({ _id: req.params.id });
    res.status(200).json({ message: "Deleted Succesfully" });
}
