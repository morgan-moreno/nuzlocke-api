import { Column, Entity } from "typeorm";
import { BaseEntity } from "./BaseEntity";

@Entity({ name: "users" })
export class User extends BaseEntity {
  @Column({ name: "username", type: "varchar", unique: true })
  username: string;

  @Column({ name: "password", type: "varchar" })
  password: string;

  @Column({
    name: "twitch_name",
    type: "varchar",
    unique: true,
    nullable: true,
  })
  twitchName?: string;

  toJSON() {
    return {
      id: this.id,
      username: this.username,
      twitchName: this.twitchName,
    };
  }
}
