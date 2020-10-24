import { Guid } from '../../guid';
import { Test } from './Test';

export class Block {
    public id: string;
    public value: string | Blob | Test;

    constructor(public name: string) {
        this.id = Guid.newGuid();
    }
}
