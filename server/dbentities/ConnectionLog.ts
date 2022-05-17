import { Entity, IdentifiedReference, Index, ManyToOne, PrimaryKey, PrimaryKeyProp, PrimaryKeyType, Property } from "@mikro-orm/core";
import type { Player } from "./Player.js";
import type { Round } from "./Round.js";

@Entity()
@Index({ name: "idx_review", properties: ["ckey", "computerid", "ip"] })
export class ConnectionLog {
  [PrimaryKeyProp]: "id";
  [PrimaryKeyType]: number;

  @PrimaryKey()
  id!: number;

  @Property({ nullable: true, defaultRaw: `NULL` })
  datetime?: Date;

  @Property({ nullable: true, defaultRaw: `NULL` })
  left?: Date;

  @Property()
  serverIp!: number;

  @Property({ columnType: "smallint" })
  serverPort!: number;

  @ManyToOne()
  roundId!: IdentifiedReference<Round>;

  @ManyToOne({ length: 45, nullable: true, defaultRaw: `NULL` })
  ckey?: IdentifiedReference<Player>;

  @Property()
  ip!: number;

  @Property({ length: 45, nullable: true, defaultRaw: `NULL` })
  computerid?: string;
}
