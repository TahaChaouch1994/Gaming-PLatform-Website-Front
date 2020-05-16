import { User } from './user'
import { Subreddits } from './subreddits'
import { Replypost } from './replypost'

export class Threadsview {
    id:number
    title:string
    description:string
    sender:User
    addtime:Date
    subreddit : Subreddits
    lastpost : Replypost
    numberofposts :number
}
