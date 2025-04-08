//import mongoose from "mongoose";
import User from "../../../../models/user";
import connectionToDatabase from "../../../../lib/mongoose";
import { NextResponse } from "next/server";

//const MONGODB_URI: string =
//process.env.MongoURL || "mongodb://localhost:27017/connection";

export async function POST(req: Request) {
  try {
    await connectionToDatabase();
    const { id,FirstName, LastName, Age, Gender, Email } = await req.json();
    const newUser = await User.create({
      id,
      FirstName,
      LastName,
      Age,
      Gender,
      Email,
    });
    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    console.log("Error connecting to MongoDB:", error);
  }
}

export async function GET() {
  try {
    await connectionToDatabase();
    const users = await User.find();
    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    console.log("Error connecting to MongoDB:", error);
  }
}

export async function PUT(req: Request) {
  try {
    await connectionToDatabase();
    
    const { _id, FirstName, LastName, Age, Gender, Email } = await req.json();
    console.log(_id);
    
    const updatedUser = await User.findByIdAndUpdate(
      _id,
      { FirstName, LastName, Age, Gender, Email },
      { new: true }
    );
    return NextResponse.json(updatedUser, { status: 200 });
  } catch (error) {
    console.log("Error connecting to MongoDB:", error);
  }
}


export async function DELETE (req:Request){
  try{
    await connectionToDatabase();
    //console.log(req.json);
    
    const {_id} = await req.json();
    console.log(_id);
    
    const deleteUser = await User.findByIdAndDelete(_id);
    return NextResponse.json(deleteUser, { status: 200 });
  }
  catch(error){
    console.log("Error connecting MongoDB:", error);
  }
}





