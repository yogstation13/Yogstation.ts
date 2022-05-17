import { Entity, IdentifiedReference, Index, ManyToOne, PrimaryKey, PrimaryKeyProp, PrimaryKeyType, Property, Unique } from "@mikro-orm/core";
import type { Player } from "./Player.js";

@Entity()
export class Donors {
  [PrimaryKeyProp]: "id";
  [PrimaryKeyType]: number;

  @Unique({ name: "id" })
  @PrimaryKey()
  id!: number;

  @Index({ name: "ckey" })
  @ManyToOne({ length: 32 })
  ckey!: IdentifiedReference<Player>;

  @Index({ name: "forum_username" })
  @Property({ length: 32, nullable: true, defaultRaw: `NULL` })
  discordId?: string;

  @Unique({ name: "transaction_id" })
  @Property({ length: 70 })
  transactionId!: string;

  @Property({ columnType: "decimal(10,2)" })
  amount!: string;

  @Property({ defaultRaw: `current_timestamp()` })
  datetime!: Date;

  @Property({ nullable: true, defaultRaw: `NULL` })
  expirationTime?: Date;

  @Property({ nullable: true, defaultRaw: "NULL" })
  revoked?: number;

  @Property({ length: 32, nullable: true, defaultRaw: `NULL` })
  revokedCkey?: string;

  @Property({ nullable: true, defaultRaw: `NULL` })
  revokedTime?: Date;

  @Property({ length: 256, nullable: true, defaultRaw: `NULL` })
  payerEmail?: string;

  @Property({ length: 32 })
  status!: string;

  @Property({ length: 1024, nullable: true, defaultRaw: `NULL` })
  notes?: string;

  @Property({ columnType: "tinyint(4)" })
  valid!: number;
}
