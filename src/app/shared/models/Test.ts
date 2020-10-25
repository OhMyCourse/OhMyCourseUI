export class Test {
    public testOptions: TestOption[];

    constructor(public task: string, public score: number) {

    }
}

export class TestOption {
    constructor(public isRight: boolean, public title: string) {
        
    }
}