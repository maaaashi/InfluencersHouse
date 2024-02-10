import type { v4 } from 'uuid'

export class User {
  constructor(
    public id: typeof v4,
    public firstName: string,
    public secondName: string,
    public email: string,
    public job: string,
    public activatedAt: Date,
    public imageURL: string
  ) {}

  // factory method
  static create(content: any) {
    return new User(
      content.id,
      content.firstName,
      content.secondName,
      content.email,
      content.job,
      content.activated_at,
      content.imageURL
    )
  }
}
