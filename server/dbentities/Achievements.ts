import { Entity, PrimaryKey, PrimaryKeyProp, PrimaryKeyType, Property } from "@mikro-orm/core";

@Entity()
export class Achievements {
  [PrimaryKeyProp]: "id";
  [PrimaryKeyType]: number;

  @Property({ columnType: "mediumtext", length: 16777215 })
  name!: string;

  @PrimaryKey()
  id!: number;

  @Property({ length: 2048 })
  descr!: string;
}
