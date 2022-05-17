import { Entity, IdentifiedReference, ManyToOne, PrimaryKey, PrimaryKeyProp, PrimaryKeyType, Property } from "@mikro-orm/core";
import type { Round } from "./Round.js";

@Entity()
export class LegacyPopulation {
  [PrimaryKeyProp]: "id";
  [PrimaryKeyType]: number;

  @PrimaryKey()
  id!: number;

  @Property({ nullable: true, defaultRaw: "NULL" })
  playercount?: number;

  @Property({ nullable: true, defaultRaw: "NULL" })
  admincount?: number;

  @Property()
  time!: Date;

  @Property()
  serverIp!: number;

  @Property({ columnType: "smallint" })
  serverPort!: number;

  @ManyToOne()
  roundId!: IdentifiedReference<Round>;
}
