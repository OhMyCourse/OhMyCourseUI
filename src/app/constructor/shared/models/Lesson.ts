import { Block } from './Block';

export class Lesson {
    public blocks: Block[] = [];

    constructor(
        public desciption?: string,
        public name?: string) {

    }
}
