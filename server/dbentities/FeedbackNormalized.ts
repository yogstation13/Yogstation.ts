import { Entity, IdentifiedReference, ManyToOne, PrimaryKey, PrimaryKeyProp, PrimaryKeyType, Property } from "@mikro-orm/core";
import type { Round } from "./Round.js";

@Entity()
export class FeedbackNormalized {
  [PrimaryKeyProp]: "id";
  [PrimaryKeyType]: number;

  @PrimaryKey()
  id!: number;

  @Property()
  datetime!: Date;

  @ManyToOne()
  roundId!: IdentifiedReference<Round>;

  @Property({ columnType: "text", length: 65535, default: "" })
  categoryPrimary!: string;

  @Property({ columnType: "text", length: 65535, default: "" })
  categorySecondary!: string;

  @Property({ columnType: "text", length: 65535, default: "" })
  categoryTertiary!: string;

  @Property({ columnType: "tinyint(3) unsigned" })
  version!: number;

  @Property({ columnType: "longtext", length: 4294967295, default: "0" })
  data!: unknown;
}
