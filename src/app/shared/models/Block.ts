import { Guid } from '../../guid';
import { Test } from './Test';

export class Block {
  public id: string;
  public value: string | Test | File | Blob;
  public materialId?: number;

  constructor(public name: string) {
    this.id = Guid.newGuid();
  }
}
