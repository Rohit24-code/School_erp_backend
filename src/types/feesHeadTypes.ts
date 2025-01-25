import { ObjectId } from "mongoose";

export interface FeesHeadType {
    feesHeading: string; 
    groupName: ObjectId; 
    accountName: ObjectId; 
    frequency: string; 
    selectMonth: number[]; 
}