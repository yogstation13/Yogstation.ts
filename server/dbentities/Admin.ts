import { Entity, IdentifiedReference, ManyToOne, OneToOne, PrimaryKeyProp, PrimaryKeyType } from "@mikro-orm/core";
import type { AdminRanks } from "./AdminRanks.js";
import type { Player } from "./Player.js";

@Entity()
export class Admin {
  [PrimaryKeyProp]: "ckey";
  [PrimaryKeyType]: string;

  @OneToOne({ length: 32, primary: true })
  ckey!: IdentifiedReference<Player>;

  @ManyToOne({ length: 32 })
  rank!: IdentifiedReference<AdminRanks>;
}
