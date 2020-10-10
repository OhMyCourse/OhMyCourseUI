import { Guid } from '../../../guid';

export class Block {
    public id: string;

    constructor(public name: string) {
        this.id = Guid.newGuid();
    }
}
