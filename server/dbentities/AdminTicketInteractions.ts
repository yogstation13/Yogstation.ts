import { Entity, ManyToOne, PrimaryKey, PrimaryKeyProp, PrimaryKeyType, Property } from "@mikro-orm/core";
import { AdminTickets } from "./AdminTickets.js";

@Entity()
export class AdminTicketInteractions {
  [PrimaryKeyProp]: "id";
  [PrimaryKeyType]: number;

  @PrimaryKey()
  id!: number;

  @ManyToOne({ entity: () => AdminTickets, nullable: true, defaultRaw: `NULL`, index: "ticket_id" })
  ticket_id?: AdminTickets;

  @Property({ defaultRaw: `current_timestamp()` })
  when!: Date;

  //No relation, not a ckey
  @Property({ length: 32 })
  user!: string;

  @Property({ columnType: "text", length: 65535, nullable: true, defaultRaw: `NULL` })
  text?: string;
}
