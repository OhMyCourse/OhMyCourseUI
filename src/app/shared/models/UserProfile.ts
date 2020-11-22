import { WithImage } from './WithImage';

export class UserProfile extends WithImage {
  constructor(
    public name: string,
    public email: string,
    public dateOfBirth: Date,
    public courseCreated: number,
    public courseStarted: number,
    public courseCompleted: number,
    public biography?: string,
    public mediaId?: number
  ) {
    super();
  }
}
