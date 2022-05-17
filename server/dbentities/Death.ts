import { Entity, IdentifiedReference, ManyToOne, PrimaryKey, PrimaryKeyProp, PrimaryKeyType, Property } from "@mikro-orm/core";
import type { Player } from "./Player.js";
import type { Round } from "./Round.js";

@Entity()
export class Death {
  [PrimaryKeyProp]: "id";
  [PrimaryKeyType]: number;

  @PrimaryKey()
  id!: number;

  @Property({ length: 50 })
  pod!: string;

  @Property({ columnType: "smallint" })
  xCoord!: number;

  @Property({ columnType: "smallint" })
  yCoord!: number;

  @Property({ columnType: "smallint" })
  zCoord!: number;

  @Property({ length: 32 })
  mapname!: string;

  @Property()
  serverIp!: number;

  @Property({ columnType: "smallint" })
  serverPort!: number;

  @ManyToOne()
  roundId!: IdentifiedReference<Round>;

  @Property()
  tod!: Date;

  @Property({ length: 32 })
  job!: string;

  @Property({ length: 32, nullable: true, defaultRaw: `NULL` })
  special?: string;

  @Property({ length: 96 })
  name!: string;

  @ManyToOne({ length: 32 })
  byondkey!: IdentifiedReference<Player>;

  @Property({ length: 96, nullable: true, defaultRaw: `NULL` })
  laname?: string;

  @ManyToOne({ length: 32, nullable: true, defaultRaw: `NULL` })
  lakey?: IdentifiedReference<Player>;

  @Property({ columnType: "smallint" })
  bruteloss!: number;

  @Property({ columnType: "smallint" })
  brainloss!: number;

  @Property({ columnType: "smallint" })
  fireloss!: number;

  @Property({ columnType: "smallint" })
  oxyloss!: number;

  @Property({ columnType: "smallint" })
  toxloss!: number;

  @Property({ columnType: "smallint" })
  cloneloss!: number;

  @Property({ columnType: "smallint" })
  staminaloss!: number;

  @Property({ length: 255, nullable: true, defaultRaw: `NULL` })
  lastWords?: string;

  @Property({ columnType: "tinyint(4)", default: 0 })
  suicide = 0;
}
