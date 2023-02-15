import { condition } from "../enum/condition";

export interface Book{
    _id?: string;
    title: string;
    author?: string;
    year?: string;
    condition:string;
    imageUrl?: string;
    _v?:number;
}