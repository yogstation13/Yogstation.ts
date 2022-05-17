import { Entity, IdentifiedReference, ManyToOne, PrimaryKeyType, Property } from "@mikro-orm/core";
import type { Player } from "./Player.js";
import type { Stickyban } from "./Stickyban.js";

@Entity()
export class StickybanMatchedCkey {
  [PrimaryKeyType]: [string, string];

  @ManyToOne({ length: 32, primary: true })
  stickyban!: IdentifiedReference<Stickyban>;

  @ManyToOne({ length: 32, primary: true })
  matchedCkey!: IdentifiedReference<Player>;

  @Property({ defaultRaw: `current_timestamp()` })
  firstMatched!: Date;

  @Property({ defaultRaw: `current_timestamp()` })
  lastMatched!: Date;

  @Property({ default: false })
  exempt = false;
}
