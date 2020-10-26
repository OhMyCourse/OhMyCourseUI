export enum CourseCategory {
  Programming,
  Math,
  Relathionships,
}

export class EnumObj {
  constructor(public id: number, public value: string) {}

  public static ParseEnum(Enum: object): EnumObj[] {
    return Object.keys(Enum)
      .filter((key) => typeof Enum[key as any] === 'number')
      .map((val, index) => new EnumObj(index, val));
  }
}
