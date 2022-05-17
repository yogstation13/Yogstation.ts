import { Entity, IdentifiedReference, Index, ManyToOne, PrimaryKey, PrimaryKeyProp, PrimaryKeyType, Property } from "@mikro-orm/core";
import type { Player } from "./Player.js";
import type { PollQuestion } from "./PollQuestion.js";

@Entity()
@Index({ name: "idx_ptext_pollid_ckey", properties: ["pollid", "ckey"] })
export class PollTextreply {
  [PrimaryKeyProp]: "id";
  [PrimaryKeyType]: number;

  @PrimaryKey()
  id!: number;

  @Property()
  datetime!: Date;

  @ManyToOne()
  pollid!: IdentifiedReference<PollQuestion>;

  @ManyToOne({ length: 32 })
  ckey!: IdentifiedReference<Player>;

  @Property()
  ip!: number;

  @Property({ length: 2048 })
  replytext!: string;

  @Property({ length: 32, default: "Player" })
  adminrank!: string;
}
