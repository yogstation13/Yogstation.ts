import { Entity, IdentifiedReference, ManyToOne, PrimaryKey, PrimaryKeyType } from "@mikro-orm/core";
import type { Player } from "./Player.js";

@Entity()
export class MfaLogins {
  [PrimaryKeyType]: [string, number, string, Date];

  @ManyToOne({ length: 32, primary: true })
  ckey!: IdentifiedReference<Player>;

  @PrimaryKey()
  ip!: number;

  @PrimaryKey({ length: 32 })
  cid!: string;

  @PrimaryKey({ defaultRaw: `current_timestamp()` })
  datetime!: Date;
}
