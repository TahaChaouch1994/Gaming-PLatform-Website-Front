import { Subreddits } from './subreddits';
export class ForumCategories {
    id:number;
    name:string;
    subreddits: Subreddits[]  = [];
    lastthread : Subreddits;
    nbrthread:number;
}
