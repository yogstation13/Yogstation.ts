import { Entity, Enum, IdentifiedReference, ManyToOne, PrimaryKey, PrimaryKeyProp, PrimaryKeyType, Property } from "@mikro-orm/core";
import type { Player } from "./Player.js";
import type { Round } from "./Round.js";

@Entity()
export class AdminLog {
  [PrimaryKeyProp]: "id";
  [PrimaryKeyType]: number;

  @PrimaryKey()
  id!: number;

  @Property()
  datetime!: Date;

  @ManyToOne()
  roundId!: IdentifiedReference<Round>;

  @ManyToOne({ length: 32 })
  adminckey!: IdentifiedReference<Player>;

  @Property()
  adminip!: number;

  @Enum({ items: () => AdminLogOperation })
  operation!: AdminLogOperation;

  @ManyToOne({ length: 32 })
  target!: IdentifiedReference<Player>;

  @Property({ length: 1000 })
  log!: string;
}

export enum AdminLogOperation {
  "ADD ADMIN" = "add admin",
  "REMOVE ADMIN" = "remove admin",
  "CHANGE ADMIN RANK" = "change admin rank",
  "ADD RANK" = "add rank",
  "REMOVE RANK" = "remove rank",
  "CHANGE RANK FLAGS" = "change rank flags",
  "ADD MENTOR" = "add mentor",
}
