import { Entity, IdentifiedReference, Index, ManyToOne, PrimaryKey, PrimaryKeyProp, PrimaryKeyType, Property } from "@mikro-orm/core";
import type { Player } from "./Player.js";
import type { Round } from "./Round.js";

@Entity()
@Index({ name: "idx_ban_isbanned", properties: ["ckey", "role", "unbannedDatetime", "expirationTime"] })
@Index({ name: "idx_ban_isbanned_details", properties: ["ckey", "ip", "computerid", "role", "unbannedDatetime", "expirationTime"] })
@Index({ name: "idx_ban_count", properties: ["bantime", "aCkey", "appliesToAdmins", "unbannedDatetime", "expirationTime"] })
export class Ban {
  [PrimaryKeyProp]: "id";
  [PrimaryKeyType]: number;

  @PrimaryKey()
  id!: number;

  @Property()
  bantime!: Date;

  @Property()
  serverIp!: number;

  @Property({ columnType: "smallint" })
  serverPort!: number;

  @ManyToOne()
  roundId!: IdentifiedReference<Round>;

  @Property({ length: 32, nullable: true, defaultRaw: `NULL` })
  role?: string;

  @Property({ nullable: true, defaultRaw: `NULL` })
  expirationTime?: Date;

  @Property({ columnType: "tinyint(3) unsigned", default: 0 })
  appliesToAdmins = 0;

  @Property({ length: 2048 })
  reason!: string;

  @ManyToOne({ length: 32, nullable: true, defaultRaw: `NULL` })
  ckey?: IdentifiedReference<Player>;

  @Property({ nullable: true, defaultRaw: `NULL` })
  ip?: number;

  @Property({ length: 32, nullable: true, defaultRaw: `NULL` })
  computerid?: string;

  @ManyToOne({ length: 32 })
  aCkey!: IdentifiedReference<Player>;

  @Property()
  aIp!: number;

  @Property({ length: 32 })
  aComputerid!: string;

  @Property({ length: 2048 })
  who!: string;

  @Property({ length: 2048 })
  adminwho!: string;

  @Property({ columnType: "mediumtext", length: 16777215, nullable: true, defaultRaw: `NULL` })
  edits?: unknown;

  @Property({ nullable: true, defaultRaw: `NULL` })
  unbannedDatetime?: Date;

  @ManyToOne({ length: 32, nullable: true, defaultRaw: `NULL` })
  unbannedCkey?: IdentifiedReference<Player>;

  @Property({ nullable: true, defaultRaw: `NULL` })
  unbannedIp?: number;

  @Property({ length: 32, nullable: true, defaultRaw: `NULL` })
  unbannedComputerid?: string;

  @ManyToOne({ nullable: true, defaultRaw: `NULL` })
  unbannedRoundId?: IdentifiedReference<Round>;
}
