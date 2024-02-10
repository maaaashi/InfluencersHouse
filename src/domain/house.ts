import type { v4 } from 'uuid'

export class House {
  constructor(
    public id: string,
    public name: string,
    public description: string,
    public place: string,
    public event_date: Date,
    public owner_id: string,
    public thumbnail: string,
    public invitations: string = ''
  ) {}

  // factory method
  static create(content: any) {
    return new House(
      content.id,
      content.name,
      content.description,
      content.place,
      content.event_date,
      content.owner_id,
      content.thumbnail,
      content.invitations
    )
  }
}
