import { Entity, IdentifiedReference, ManyToOne, PrimaryKey, PrimaryKeyType, Property } from "@mikro-orm/core";
import type { Stickyban } from "./Stickyban.js";

@Entity()
export class StickybanMatchedIp {
  [PrimaryKeyType]: [string, number];

  @ManyToOne({ length: 32, primary: true })
  stickyban!: IdentifiedReference<Stickyban>;

  @PrimaryKey()
  matchedIp!: number;

  @Property({ defaultRaw: `current_timestamp()` })
  firstMatched!: Date;

  @Property({ defaultRaw: `current_timestamp()` })
  lastMatched!: Date;
}
