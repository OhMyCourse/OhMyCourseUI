import { Guid } from '../../../guid';

export class Block {
    public id: string;
    public order: number;
    
    constructor(public name: string) {
        this.id = Guid.newGuid();
    }
}
