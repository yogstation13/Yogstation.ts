import { Collection, Entity, IdentifiedReference, ManyToOne, OneToMany, OneToOne, PrimaryKey, PrimaryKeyProp, PrimaryKeyType, Property } from "@mikro-orm/core";
import type { Player } from "./Player.js";
import { StickybanMatchedCid } from "./StickybanMatchedCid.js";
import { StickybanMatchedCkey } from "./StickybanMatchedCkey.js";
import { StickybanMatchedIp } from "./StickybanMatchedIp.js";

@Entity()
export class Stickyban {
  [PrimaryKeyProp]: "ckey";
  [PrimaryKeyType]: string;

  //This cannot be a relation due to a bug
  @PrimaryKey({ length: 32 })
  ckey!: string;

  @Property({ length: 2048 })
  reason!: string;

  @ManyToOne({ length: 32 })
  banningAdmin!: IdentifiedReference<Player>;

  @Property({ defaultRaw: `current_timestamp()` })
  datetime!: Date;

  //Relations
  @OneToMany(() => StickybanMatchedCid, "stickyban")
  r_matchedCids = new Collection<StickybanMatchedCid>(this);

  @OneToMany(() => StickybanMatchedCkey, "stickyban")
  r_matchedCkeys = new Collection<StickybanMatchedCkey>(this);

  @OneToMany(() => StickybanMatchedIp, "stickyban")
  r_matchedIps = new Collection<StickybanMatchedIp>(this);
}
