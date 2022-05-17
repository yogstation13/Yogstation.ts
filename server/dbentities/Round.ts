import { Collection, Entity, OneToMany, PrimaryKey, PrimaryKeyProp, PrimaryKeyType, Property } from "@mikro-orm/core";
import { AdminLog } from "./AdminLog.js";
import { AdminTickets } from "./AdminTickets.js";
import { AntagTokens } from "./AntagTokens.js";
import { Ban } from "./Ban.js";
import { ConnectionLog } from "./ConnectionLog.js";
import { Death } from "./Death.js";
import { Feedback } from "./Feedback.js";
import { FeedbackNormalized } from "./FeedbackNormalized.js";
import { LegacyPopulation } from "./LegacyPopulation.js";
import { Library } from "./Library.js";
import { Messages } from "./Messages.js";
import { Player } from "./Player.js";

@Entity()
export class Round {
  [PrimaryKeyProp]: "id";
  [PrimaryKeyType]: number;

  @PrimaryKey()
  id!: number;

  @Property()
  initializeDatetime!: Date;

  @Property({ nullable: true, defaultRaw: `NULL` })
  startDatetime?: Date;

  @Property({ nullable: true, defaultRaw: `NULL` })
  shutdownDatetime?: Date;

  @Property({ nullable: true, defaultRaw: `NULL` })
  endDatetime?: Date;

  @Property()
  serverIp!: number;

  @Property({ columnType: "smallint" })
  serverPort!: number;

  @Property({ columnType: "char(40)", length: 40, nullable: true, defaultRaw: `NULL` })
  commitHash?: unknown;

  @Property({ length: 32, nullable: true, defaultRaw: `NULL` })
  gameMode?: string;

  @Property({ length: 64, nullable: true, defaultRaw: `NULL` })
  gameModeResult?: string;

  @Property({ length: 64, nullable: true, defaultRaw: `NULL` })
  endState?: string;

  @Property({ length: 64, nullable: true, defaultRaw: `NULL` })
  shuttleName?: string;

  @Property({ length: 32, nullable: true, defaultRaw: `NULL` })
  mapName?: string;

  @Property({ length: 80, nullable: true, defaultRaw: `NULL` })
  stationName?: string;

  //Relations
  @OneToMany(() => AdminLog, "roundId")
  r_adminLogs = new Collection<AdminLog>(this);

  @OneToMany(() => AdminTickets, "roundId")
  r_tickets = new Collection<AdminTickets>(this);

  @OneToMany(() => AntagTokens, "roundId")
  r_antagTokens = new Collection<AntagTokens>(this);

  @OneToMany(() => Ban, "roundId")
  r_bans = new Collection<Ban>(this);

  @OneToMany(() => Ban, "unbannedRoundId")
  r_bans_unbans = new Collection<Ban>(this);

  @OneToMany(() => ConnectionLog, "roundId")
  r_connections = new Collection<ConnectionLog>(this);

  @OneToMany(() => Death, "roundId")
  r_deaths = new Collection<Death>(this);

  @OneToMany(() => Feedback, "roundId")
  r_feedback = new Collection<Feedback>(this);

  @OneToMany(() => FeedbackNormalized, "roundId")
  r_feedbackNormalized = new Collection<FeedbackNormalized>(this);

  @OneToMany(() => LegacyPopulation, "roundId")
  r_population = new Collection<LegacyPopulation>(this);

  @OneToMany(() => Library, "roundIdCreated")
  r_books = new Collection<Library>(this);

  @OneToMany(() => Messages, "roundId")
  r_messages = new Collection<Messages>(this);

  @OneToMany(() => Player, "firstseenRoundId")
  r_players_firstSeen = new Collection<Player>(this);

  @OneToMany(() => Player, "lastseenRoundId")
  r_players_lastSeen = new Collection<Player>(this);
}
