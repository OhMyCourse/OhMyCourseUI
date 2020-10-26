export class Test {
  public testOptions: TestOption[] = [];

  constructor(
    public task?: string,
    public score?: number,
    public type?: TestType
  ) {}
}

export class TestOption {
  constructor(
    public isRight?: boolean,
    public title?: string,
    public value?: number
  ) {}
}

export enum TestType {
  Checkbox,
  Radio,
  Short,
}
