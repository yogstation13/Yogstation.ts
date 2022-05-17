import { Entity, IdentifiedReference, ManyToOne, PrimaryKey, PrimaryKeyType, Property } from "@mikro-orm/core";
import type { Player } from "./Player.js";

@Entity()
export class RoleTime {
  [PrimaryKeyType]: [string, string];

  @ManyToOne({ length: 32, primary: true })
  ckey!: IdentifiedReference<Player>;

  @PrimaryKey({ length: 128 })
  job!: string;

  @Property()
  minutes!: number;
}
