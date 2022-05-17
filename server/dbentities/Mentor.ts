import { Entity, IdentifiedReference, OneToOne, PrimaryKey, PrimaryKeyProp, PrimaryKeyType, Property } from "@mikro-orm/core";
import type { Player } from "./Player.js";

@Entity()
export class Mentor {
  [PrimaryKeyProp]: "id";
  [PrimaryKeyType]: number;

  @PrimaryKey()
  id!: number;

  @OneToOne({ length: 32 })
  ckey!: IdentifiedReference<Player>;

  @Property({ length: 32 })
  position!: string;
}
