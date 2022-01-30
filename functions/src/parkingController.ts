import { Response } from 'express'
import { db } from './config/firebase'

type ParkingSpace = {
    name: string;
    totalSlots: number;
    filledSlots: number;
    time: Date;
}

type Request = {
    body: ParkingSpace,
    params: { entryId: string }
  }


const getAll = async (req: Request, res: Response) => {
    try {
        const allData = await db.collection('ParkingSpace').orderBy("time", "desc").get()
        return res.status(200).json(allData.docs)
      } catch(error) { return res.status(500).end}
}


const getCurent = async () => {
    const allData: ParkingSpace[] = []
    const querySnapshot = await db.collection('ParkingSpace').orderBy("time", "desc").get()
    querySnapshot.forEach((doc: any) => allData.push(doc.data()))
    return allData[0]
}

const addCar = async (req: Request, res: Response) => {
    var {totalSlots, name, filledSlots} = await getCurent()
    try {
        if (!(filledSlots>=totalSlots)){
            filledSlots ++
        }
        
        const parkingDoc = db.collection('ParkingSpace').doc()

        const entryObject = {
            id: parkingDoc.id,
            totalSlots,
            name,
            filledSlots,
            time: new Date()
        }
  
        parkingDoc.set(entryObject)
    
        res.status(200).send({
            status: 'success',
            message: 'car added successfully'
        })
    } catch(error) {
        res.status(500).end;
    }
  }


  const removeCar = async (req: Request, res: Response) => {
    var {totalSlots, name, filledSlots} = await getCurent()
    try {
        if (!(filledSlots<=0)){
            filledSlots --
        }
        const parkingDoc = db.collection('ParkingSpace').doc()

        const entryObject = {
            id: parkingDoc.id,
            totalSlots,
            name,
            filledSlots,
            time: new Date()
        }
  
        parkingDoc.set(entryObject)
    
        res.status(200).send({
            status: 'success',
            message: 'car removed successfully',
        })
    } catch(error) {
        res.status(500).end;
    }
  }

  const getLastUpdate = async (req: Request, res: Response) => {
        try {
            const parking: ParkingSpace = await getCurent()
            return res.status(200).json(parking)
        } catch(error) { return res.status(500).end}
    }

export {getAll, addCar, removeCar, getLastUpdate}
