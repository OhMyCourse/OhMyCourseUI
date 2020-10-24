export class Test {
    public testOptions: TestOption[];

    constructor(public asnwer: string) {

    }
}

export class TestOption {
    constructor(public isRight: boolean, public answer: string) {
        
    }
}