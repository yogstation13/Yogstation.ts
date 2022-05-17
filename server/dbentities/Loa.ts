import { DateType, Entity, IdentifiedReference, ManyToOne, PrimaryKey, PrimaryKeyProp, PrimaryKeyType, Property } from "@mikro-orm/core";
import type { Player } from "./Player.js";

@Entity()
export class Loa {
  [PrimaryKeyProp]: "id";
  [PrimaryKeyType]: number;

  @PrimaryKey()
  id!: number;

  @ManyToOne({ length: 32 })
  ckey!: IdentifiedReference<Player>;

  @Property({ type: DateType })
  time!: Date;

  @Property({ type: DateType })
  expiryTime!: Date;

  @Property({ columnType: "bit(1)", nullable: true, defaultRaw: `NULL` })
  revoked?: boolean;

  @Property({ columnType: "text", length: 65535 })
  reason!: string;
}
