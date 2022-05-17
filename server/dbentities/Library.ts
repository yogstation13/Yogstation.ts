import { Entity, Enum, IdentifiedReference, Index, ManyToOne, PrimaryKey, PrimaryKeyProp, PrimaryKeyType, Property } from "@mikro-orm/core";
import type { Player } from "./Player.js";
import type { Round } from "./Round.js";

@Entity()
@Index({ name: "idx_lib_id_del", properties: ["id", "deleted"] })
@Index({ name: "idx_lib_del_title", properties: ["deleted", "title"] })
@Index({ name: "idx_lib_search", properties: ["deleted", "author", "title", "category"] })
export class Library {
  [PrimaryKeyProp]: "id";
  [PrimaryKeyType]: number;

  @PrimaryKey()
  id!: number;

  @Property({ length: 45 })
  author!: string;

  @Property({ length: 45 })
  title!: string;

  @Property({ columnType: "mediumtext", length: 16777215 })
  content!: unknown;

  @Enum({ items: () => LibraryCategory })
  category!: LibraryCategory;

  @ManyToOne({ length: 32, default: "LEGACY" })
  ckey!: IdentifiedReference<Player>;

  @Property()
  datetime!: Date;

  @Index({ name: "deleted_idx" })
  @Property({ columnType: "tinyint(3) unsigned", nullable: true, defaultRaw: "NULL" })
  deleted?: number;

  @ManyToOne()
  roundIdCreated!: IdentifiedReference<Round>;
}

export enum LibraryCategory {
  ANY = "Any",
  FICTION = "Fiction",
  "NON-FICTION" = "Non-Fiction",
  ADULT = "Adult",
  REFERENCE = "Reference",
  RELIGION = "Religion",
}
