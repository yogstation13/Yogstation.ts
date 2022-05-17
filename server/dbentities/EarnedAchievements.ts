import { Entity, IdentifiedReference, ManyToOne, PrimaryKey, PrimaryKeyType } from "@mikro-orm/core";
import type { Player } from "./Player.js";

@Entity()
export class EarnedAchievements {
  [PrimaryKeyType]: [string, number];

  @ManyToOne({ length: 32, primary: true })
  ckey!: IdentifiedReference<Player>;

  @PrimaryKey()
  id!: number;
}
