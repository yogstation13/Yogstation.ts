import { Entity, IdentifiedReference, ManyToOne, OneToOne, PrimaryKeyProp, PrimaryKeyType, Property } from "@mikro-orm/core";
import type { Player } from "./Player.js";

@Entity()
export class MentorMemo {
  [PrimaryKeyProp]: "ckey";
  [PrimaryKeyType]: string;

  @OneToOne({ length: 32, primary: true })
  ckey!: IdentifiedReference<Player>;

  @Property({ columnType: "mediumtext", length: 16777215 })
  memotext!: unknown;

  @Property()
  timestamp!: Date;

  @ManyToOne({ length: 32, nullable: true, defaultRaw: `NULL` })
  lastEditor?: IdentifiedReference<Player>;

  @Property({ columnType: "mediumtext", length: 16777215, nullable: true, defaultRaw: `NULL` })
  edits?: unknown;
}
