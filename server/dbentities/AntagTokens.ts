import { Entity, IdentifiedReference, ManyToOne, PrimaryKey, PrimaryKeyProp, PrimaryKeyType, Property } from "@mikro-orm/core";
import type { Player } from "./Player.js";
import type { Round } from "./Round.js";

@Entity()
export class AntagTokens {
  [PrimaryKeyProp]: "id";
  [PrimaryKeyType]: number;

  @PrimaryKey()
  id!: number;

  @ManyToOne({ length: 32 })
  ckey!: IdentifiedReference<Player>;

  @Property({ length: 2048 })
  reason!: string;

  @Property({ length: 2048, nullable: true, defaultRaw: `NULL` })
  denialReason?: string;

  @ManyToOne({ length: 32 })
  applyingAdmin!: IdentifiedReference<Player>;

  @ManyToOne({ length: 32, nullable: true, defaultRaw: `NULL` })
  denyingAdmin?: IdentifiedReference<Player>;

  @Property()
  grantedTime!: Date;

  @Property({ columnType: "tinyint(3) unsigned", default: 0 })
  redeemed = 0;

  @ManyToOne()
  roundId!: IdentifiedReference<Round>;
}
