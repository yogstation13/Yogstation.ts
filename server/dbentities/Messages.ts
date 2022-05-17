import { Entity, IdentifiedReference, Index, ManyToOne, PrimaryKey, PrimaryKeyProp, PrimaryKeyType, Property } from "@mikro-orm/core";
import type { Player } from "./Player.js";
import type { Round } from "./Round.js";

@Entity()
@Index({ name: "idx_msg_ckey_time", properties: ["targetckey", "timestamp", "deleted"] })
@Index({ name: "idx_msg_type_ckeys_time", properties: ["type", "targetckey", "adminckey", "timestamp", "deleted"] })
@Index({ name: "idx_msg_type_ckey_time_odr", properties: ["type", "targetckey", "timestamp", "deleted"] })
export class Messages {
  [PrimaryKeyProp]: "id";
  [PrimaryKeyType]: number;

  @PrimaryKey()
  id!: number;

  @Property({ length: 32 })
  type!: string;

  @ManyToOne({ length: 32 })
  targetckey!: IdentifiedReference<Player>;

  @ManyToOne({ length: 32 })
  adminckey!: IdentifiedReference<Player>;

  @Property({ columnType: "mediumtext", length: 16777215 })
  text!: unknown;

  @Property()
  timestamp!: Date;

  @Property({ length: 32, nullable: true, defaultRaw: `NULL` })
  server?: string;

  @Property()
  serverIp!: number;

  @Property({ columnType: "smallint" })
  serverPort!: number;

  @ManyToOne()
  roundId!: IdentifiedReference<Round>;

  @Property({ nullable: true, default: true })
  secret?: boolean = true;

  @Property({ nullable: true, defaultRaw: `NULL` })
  expireTimestamp?: Date;

  @ManyToOne({ length: 32, nullable: true, defaultRaw: `NULL` })
  lasteditor?: IdentifiedReference<Player>;

  @Property({ columnType: "mediumtext", length: 16777215, nullable: true, defaultRaw: `NULL` })
  edits?: unknown;

  @Property({ columnType: "tinyint(3) unsigned", default: 0 })
  deleted = 0;
}
