export interface Loan {
    _id:string,
    _idBook:String,
    _idUser:String,
    titleBook?:String, 
    nameUser?:String,
    dateOfBorrow:Date, 
    dateOfReturn?:Date
}