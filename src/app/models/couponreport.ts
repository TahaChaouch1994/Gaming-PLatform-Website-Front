import { Betcoupon } from './betcoupon';
import { User } from './user';
export class Couponreport {



    id:number
    title:string
    description:string
    sender:User
    addtime:Date
    coupon: Betcoupon
   state = "unchecked"

}
