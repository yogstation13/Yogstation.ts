import {
  Collection,
  Entity,
  IdentifiedReference,
  Index,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryKey,
  PrimaryKeyProp,
  PrimaryKeyType,
  Property,
} from "@mikro-orm/core";
import { ActionLog } from "./ActionLog.js";
import type { Admin } from "./Admin.js";
import { AdminLog } from "./AdminLog.js";
import { AdminTickets } from "./AdminTickets.js";
import { AntagTokens } from "./AntagTokens.js";
import { Ban } from "./Ban.js";
import { ConnectionLog } from "./ConnectionLog.js";
import { Death } from "./Death.js";
import { Donors } from "./Donors.js";
import { EarnedAchievements } from "./EarnedAchievements.js";
import { Library } from "./Library.js";
import { Loa } from "./Loa.js";
import type { Mentor } from "./Mentor.js";
import { MentorMemo } from "./MentorMemo.js";
import { Messages } from "./Messages.js";
import { MfaLogins } from "./MfaLogins.js";
import { PollQuestion } from "./PollQuestion.js";
import { PollTextreply } from "./PollTextreply.js";
import { PollVote } from "./PollVote.js";
import { RoleTime } from "./RoleTime.js";
import { RoleTimeLog } from "./RoleTimeLog.js";
import type { Round } from "./Round.js";
import { Stickyban } from "./Stickyban.js";
import { StickybanMatchedCkey } from "./StickybanMatchedCkey.js";

@Entity()
@Index({ name: "idx_player_cid_ckey", properties: ["computerid", "ckey"] })
@Index({ name: "idx_player_ip_ckey", properties: ["ip", "ckey"] })
export class Player {
  [PrimaryKeyType]: string;
  [PrimaryKeyProp]: "ckey";

  @PrimaryKey({ length: 32 })
  ckey!: string;

  @Property({ length: 32, nullable: true, defaultRaw: `NULL` })
  byondKey?: string;

  @Property()
  firstseen!: Date;

  @ManyToOne()
  firstseenRoundId!: IdentifiedReference<Round>;

  @Property()
  lastseen!: Date;

  @ManyToOne()
  lastseenRoundId!: IdentifiedReference<Round>;

  @Property()
  ip!: number;

  @Property({ length: 32 })
  computerid!: string;

  @Property({ length: 32, default: "Player" })
  lastadminrank!: string;

  @Property({ columnType: "date", nullable: true, defaultRaw: `NULL` })
  accountjoindate?: string;

  @Property({ default: 0 })
  flags = 0;

  @Property({ columnType: "bigint", nullable: true, defaultRaw: `NULL` })
  discordId?: string;

  @Property({ default: 0 })
  antagTokens = 0;

  @Property({ columnType: "bigint", defaultRaw: `0` })
  credits!: string;

  @Property({ columnType: "mediumint(8) unsigned", defaultRaw: `100` })
  antagWeight!: unknown;

  @Property({ columnType: "tinyint(3) unsigned", default: 0 })
  jobWhitelisted = 0;

  @Property({ length: 20, nullable: true, defaultRaw: `NULL` })
  totpSeed?: string;

  @Property({ length: 128, nullable: true, defaultRaw: `NULL` })
  mfaBackup?: string;

  //Relations
  @OneToOne({ mappedBy: "ckey" })
  r_admin?: Admin;

  @OneToMany(() => AdminLog, "adminckey")
  r_adminLogs = new Collection<AdminLog>(this);

  @OneToMany(() => AdminLog, "target")
  r_adminLogs_target = new Collection<AdminLog>(this);

  @OneToMany(() => AdminTickets, "ckey")
  r_tickets = new Collection<AdminTickets>(this);

  @OneToMany(() => AdminTickets, "aCkey")
  r_tickets_admin = new Collection<AdminTickets>(this);

  @OneToMany(() => AntagTokens, "ckey")
  r_antagTokens = new Collection<AntagTokens>(this);

  @OneToMany(() => AntagTokens, "applyingAdmin")
  r_antagTokens_applyingAdmin = new Collection<AntagTokens>(this);

  @OneToMany(() => AntagTokens, "denyingAdmin")
  r_antagTokens_denyingAdmin = new Collection<AntagTokens>(this);

  @OneToMany(() => Ban, "ckey")
  r_bans = new Collection<Ban>(this);

  @OneToMany(() => Ban, "aCkey")
  r_bans_admin = new Collection<Ban>(this);

  @OneToMany(() => Ban, "unbannedCkey")
  r_bans_unbans = new Collection<Ban>(this);

  @OneToMany(() => ConnectionLog, "ckey")
  r_connections = new Collection<ConnectionLog>(this);

  @OneToMany(() => Death, "byondkey")
  r_deaths = new Collection<Death>(this);

  @OneToMany(() => Death, "lakey")
  r_deaths_attacker = new Collection<Death>(this);

  @OneToMany(() => Donors, "ckey")
  r_donors = new Collection<Death>(this);

  @OneToMany(() => EarnedAchievements, "ckey")
  r_achievements = new Collection<EarnedAchievements>(this);

  @OneToMany(() => Library, "ckey")
  r_books = new Collection<Library>(this);

  @OneToMany(() => Loa, "ckey")
  r_loas = new Collection<Loa>(this);

  @OneToOne({ mappedBy: "ckey" })
  r_mentor?: IdentifiedReference<Mentor>;

  @OneToOne({ mappedBy: "ckey" })
  r_mentorMemo?: IdentifiedReference<MentorMemo>;

  @OneToMany(() => MentorMemo, "lastEditor")
  r_mentorMemos_edited = new Collection<MentorMemo>(this);

  @OneToMany(() => Messages, "targetckey")
  r_messages_target = new Collection<Messages>(this);

  @OneToMany(() => Messages, "adminckey")
  r_messages_admin = new Collection<Messages>(this);

  @OneToMany(() => Messages, "lasteditor")
  r_messages_edited = new Collection<Messages>(this);

  @OneToMany(() => MfaLogins, "ckey")
  r_mfaLogins = new Collection<MfaLogins>(this);

  @OneToMany(() => PollQuestion, "createdbyCkey")
  r_pollQuestions_created = new Collection<PollQuestion>(this);

  @OneToMany(() => PollTextreply, "ckey")
  r_pollTextReplies = new Collection<PollTextreply>(this);

  @OneToMany(() => PollVote, "ckey")
  r_pollVotes = new Collection<PollVote>(this);

  @OneToMany(() => RoleTime, "ckey")
  r_rollTimes = new Collection<RoleTime>(this);

  @OneToMany(() => RoleTimeLog, "ckey")
  r_rollTimeLogs = new Collection<RoleTimeLog>(this);

  @OneToMany(() => Stickyban, "banningAdmin")
  r_stickyban_admin = new Collection<Stickyban>(this);

  @OneToMany(() => StickybanMatchedCkey, "matchedCkey")
  r_stickbanMatchedCkeys = new Collection<StickybanMatchedCkey>(this);

  @OneToMany(() => ActionLog, "adminid")
  r_actionLogs = new Collection<ActionLog>(this);

  @OneToMany(() => ActionLog, "target")
  r_actionLogs_target = new Collection<ActionLog>(this);
}
