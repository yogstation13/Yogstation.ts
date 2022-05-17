import { Entity, PrimaryKey, PrimaryKeyProp, PrimaryKeyType, Property } from "@mikro-orm/core";

@Entity()
export class Misc {
  [PrimaryKeyProp]: "key";
  [PrimaryKeyType]: string;

  @PrimaryKey({ length: 32 })
  key!: string;

  @Property({ length: 2048 })
  value!: string;
}
