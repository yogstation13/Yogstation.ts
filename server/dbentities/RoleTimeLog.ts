import { Entity, IdentifiedReference, Index, ManyToOne, PrimaryKey, PrimaryKeyProp, PrimaryKeyType, Property } from "@mikro-orm/core";
import type { Player } from "./Player.js";

@Entity()
export class RoleTimeLog {
  [PrimaryKeyProp]: "id";
  [PrimaryKeyType]: string;

  @PrimaryKey({ columnType: "bigint" })
  id!: string;

  @Index({ name: "ckey" })
  @ManyToOne({ length: 32 })
  ckey!: IdentifiedReference<Player>;

  @Index({ name: "job" })
  @Property({ length: 128 })
  job!: string;

  @Property()
  delta!: number;

  @Index({ name: "datetime" })
  @Property({ defaultRaw: `current_timestamp()` })
  datetime!: Date;
}
