import { Collection, Entity, IdentifiedReference, Index, ManyToOne, OneToMany, PrimaryKey, PrimaryKeyProp, PrimaryKeyType, Property } from "@mikro-orm/core";
import type { PollQuestion } from "./PollQuestion.js";
import { PollVote } from "./PollVote.js";

@Entity()
export class PollOption {
  [PrimaryKeyProp]: "id";
  [PrimaryKeyType]: number;

  @PrimaryKey()
  id!: number;

  @Index({ name: "idx_pop_pollid" })
  @ManyToOne()
  pollid!: IdentifiedReference<PollQuestion>;

  @Property({ length: 255 })
  text!: string;

  @Property({ nullable: true, defaultRaw: "NULL" })
  minval?: number;

  @Property({ nullable: true, defaultRaw: "NULL" })
  maxval?: number;

  @Property({ length: 32, nullable: true, defaultRaw: `NULL` })
  descmin?: string;

  @Property({ length: 32, nullable: true, defaultRaw: `NULL` })
  descmid?: string;

  @Property({ length: 32, nullable: true, defaultRaw: `NULL` })
  descmax?: string;

  @Property({ columnType: "tinyint(3) unsigned", default: 1 })
  defaultPercentageCalc = 1;

  //Relations
  @OneToMany(() => PollVote, "optionid")
  r_pollVotes = new Collection<PollVote>(this);
}
