import { Collection, Entity, IdentifiedReference, Index, ManyToOne, OneToMany, PrimaryKey, PrimaryKeyProp, PrimaryKeyType, Property } from "@mikro-orm/core";
import { AdminTicketInteractions } from "./AdminTicketInteractions.js";
import type { Player } from "./Player.js";
import type { Round } from "./Round.js";

@Entity()
@Index({ name: "idx_round_ticket", properties: ["roundId", "ticketId"] })
export class AdminTickets {
  [PrimaryKeyProp]: "id";
  [PrimaryKeyType]: number;

  @PrimaryKey()
  id!: number;

  @Index({ name: "idx_round" })
  @ManyToOne({ default: 0 })
  roundId!: IdentifiedReference<Round>;

  @Property({ default: 0 })
  ticketId = 0;

  @Property({ defaultRaw: `current_timestamp()` })
  when!: Date;

  @ManyToOne({ length: 32 })
  ckey!: IdentifiedReference<Player>;

  @ManyToOne({ length: 32, nullable: true, defaultRaw: `NULL` })
  aCkey?: IdentifiedReference<Player>;

  //Relations
  @OneToMany(() => AdminTicketInteractions, "ticket_id")
  r_interactions = new Collection<AdminTicketInteractions>(this);
}
