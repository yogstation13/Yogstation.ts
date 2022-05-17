import { Entity, IdentifiedReference, Index, ManyToOne, PrimaryKey, PrimaryKeyProp, PrimaryKeyType, Property } from "@mikro-orm/core";
import type { Player } from "./Player.js";
import type { PollOption } from "./PollOption.js";
import type { PollQuestion } from "./PollQuestion.js";

@Entity()
@Index({ name: "idx_pvote_pollid_ckey", properties: ["pollid", "ckey"] })
@Index({ name: "idx_pvote_optionid_ckey", properties: ["optionid", "ckey"] })
export class PollVote {
  [PrimaryKeyProp]: "id";
  [PrimaryKeyType]: number;

  @PrimaryKey()
  id!: number;

  @Property()
  datetime!: Date;

  @ManyToOne()
  pollid!: IdentifiedReference<PollQuestion>;

  @ManyToOne()
  optionid!: IdentifiedReference<PollOption>;

  @ManyToOne({ length: 32 })
  ckey!: IdentifiedReference<Player>;

  @Property()
  ip!: number;

  @Property({ length: 32 })
  adminrank!: string;

  @Property({ nullable: true, defaultRaw: "NULL" })
  rating?: number;
}
