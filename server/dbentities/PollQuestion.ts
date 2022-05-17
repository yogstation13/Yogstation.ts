import {
  Collection,
  Entity,
  Enum,
  IdentifiedReference,
  Index,
  ManyToOne,
  OneToMany,
  PrimaryKey,
  PrimaryKeyProp,
  PrimaryKeyType,
  Property,
} from "@mikro-orm/core";
import type { Player } from "./Player.js";
import { PollOption } from "./PollOption.js";
import { PollTextreply } from "./PollTextreply.js";
import { PollVote } from "./PollVote.js";

@Entity()
@Index({ name: "idx_pquest_question_time_ckey", properties: ["question", "starttime", "endtime", "createdbyCkey", "createdbyIp"] })
@Index({ name: "idx_pquest_time_admin", properties: ["starttime", "endtime", "adminonly"] })
@Index({ name: "idx_pquest_id_time_type_admin", properties: ["id", "starttime", "endtime", "polltype", "adminonly"] })
export class PollQuestion {
  [PrimaryKeyProp]: "id";
  [PrimaryKeyType]: number;

  @PrimaryKey()
  id!: number;

  @Enum({ items: () => PollQuestionPolltype })
  polltype!: PollQuestionPolltype;

  @Property()
  starttime!: Date;

  @Property()
  endtime!: Date;

  @Property({ length: 255 })
  question!: string;

  @Property({ columnType: "tinyint(3) unsigned" })
  adminonly!: number;

  @Property({ nullable: true, defaultRaw: "NULL" })
  multiplechoiceoptions?: number;

  @ManyToOne({ length: 32, nullable: true, defaultRaw: `NULL` })
  createdbyCkey?: IdentifiedReference<Player>;

  @Property()
  createdbyIp!: number;

  @Property({ columnType: "tinyint(3) unsigned" })
  dontshow!: number;

  //Relations
  @OneToMany(() => PollOption, "pollid")
  r_pollOptions = new Collection<PollOption>(this);

  @OneToMany(() => PollTextreply, "pollid")
  r_pollTextReplies = new Collection<PollTextreply>(this);

  @OneToMany(() => PollVote, "pollid")
  r_pollVotes = new Collection<PollVote>(this);
}

export enum PollQuestionPolltype {
  OPTION = "OPTION",
  TEXT = "TEXT",
  NUMVAL = "NUMVAL",
  MULTICHOICE = "MULTICHOICE",
  IRV = "IRV",
}
