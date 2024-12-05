import { NextRequest, NextResponse } from "next/server";
import {ConnectDB} from "../../lib/config/db";
import TodoModel from "../../lib/models/TodoModel";
type Todo = {
    _id: string
    title: string
    description: string
    isCompleted: boolean
}
const loadDB = async () => {
    await ConnectDB();
}

loadDB();

export async function GET(){
    const todoList : Todo[] = await TodoModel.find({});
    return NextResponse.json({todos: todoList});
}
export async function POST(request : NextRequest){
    const {title, description} = await request.json();
    await TodoModel.create({
        title,
        description
    })
    return NextResponse.json({msg: "Todo created"});
}
export async function PUT(request : NextRequest){
    const mongoId = await request.nextUrl.searchParams.get("_id");
    await TodoModel.findByIdAndUpdate(mongoId, {
        $set: {
            isCompleted: true
        }
    })
    return NextResponse.json({msg: "Todo updated"})
    
}
export async function DELETE(request: NextRequest){
   const mongoId = await request.nextUrl.searchParams.get("_id");
   await TodoModel.findByIdAndDelete(mongoId); 
    return NextResponse.json({msg: "Todo deleted"});
}