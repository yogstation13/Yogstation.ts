import { Entity, IdentifiedReference, ManyToOne, PrimaryKey, PrimaryKeyProp, PrimaryKeyType, Property } from "@mikro-orm/core";
import type { Player } from "./Player.js";

@Entity({ tableName: "web_logs" })
export class ActionLog {
  [PrimaryKeyProp]: "id";
  [PrimaryKeyType]: number;

  @PrimaryKey()
  id!: number;

  @ManyToOne({ length: 32 })
  adminid!: IdentifiedReference<Player>;

  @ManyToOne({ length: 32 })
  target!: IdentifiedReference<Player>;

  @Property({ columnType: "mediumtext", length: 16777215 })
  description!: string;

  @Property({ defaultRaw: `current_timestamp()` })
  timestamp!: Date;
}
