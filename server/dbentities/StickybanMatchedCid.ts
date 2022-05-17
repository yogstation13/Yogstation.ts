import { Entity, IdentifiedReference, ManyToOne, PrimaryKey, PrimaryKeyType, Property } from "@mikro-orm/core";
import type { Stickyban } from "./Stickyban.js";

@Entity()
export class StickybanMatchedCid {
  [PrimaryKeyType]: [string, string];

  @ManyToOne({ length: 32, primary: true })
  stickyban!: IdentifiedReference<Stickyban>;

  @PrimaryKey({ length: 32 })
  matchedCid!: string;

  @Property({ defaultRaw: `current_timestamp()` })
  firstMatched!: Date;

  @Property({ defaultRaw: `current_timestamp()` })
  lastMatched!: Date;
}
