import { Entity, PrimaryKey, PrimaryKeyType, Property } from "@mikro-orm/core";

@Entity()
export class SchemaRevision {
  [PrimaryKeyType]: [number, number];

  @PrimaryKey({ columnType: "tinyint(3) unsigned" })
  major!: number;

  @PrimaryKey({ columnType: "tinyint(3) unsigned" })
  minor!: number;

  @Property({ defaultRaw: `current_timestamp()` })
  date!: Date;
}
