import { User } from './user'
import { Subreddits } from './subreddits'

export class Thread {
    id:number
    title:string
    description:string
    sender:User
    addtime:Date
    subreddit : Subreddits
}

