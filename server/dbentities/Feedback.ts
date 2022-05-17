import { Entity, Enum, IdentifiedReference, ManyToOne, PrimaryKey, PrimaryKeyProp, PrimaryKeyType, Property } from "@mikro-orm/core";
import type { Round } from "./Round.js";

@Entity()
export class Feedback {
  [PrimaryKeyProp]: "id";
  [PrimaryKeyType]: number;

  @PrimaryKey()
  id!: number;

  @Property()
  datetime!: Date;

  @ManyToOne()
  roundId!: IdentifiedReference<Round>;

  @Property({ length: 32 })
  keyName!: string;

  @Enum({ items: () => FeedbackKeyType })
  keyType!: FeedbackKeyType;

  @Property({ columnType: "tinyint(3) unsigned" })
  version!: number;

  @Property({ columnType: "json" })
  json!: Record<string, unknown>;
}

export enum FeedbackKeyType {
  TEXT = "text",
  AMOUNT = "amount",
  TALLY = "tally",
  "NESTED TALLY" = "nested tally",
  ASSOCIATIVE = "associative",
}
