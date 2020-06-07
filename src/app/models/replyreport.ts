import { User } from './user'
import { Replypost } from './replypost'

export class Replyreport {
    id:number
    title:string
    description:string
    sender:User
    addtime:Date
    reply: Replypost
   state  = "unchecked"
}
