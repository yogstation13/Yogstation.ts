import { Collection, Entity, OneToMany, PrimaryKey, PrimaryKeyProp, PrimaryKeyType, Property } from "@mikro-orm/core";
import { Admin } from "./Admin.js";

@Entity()
export class AdminRanks {
  [PrimaryKeyProp]: "rank";
  [PrimaryKeyType]: string;

  @PrimaryKey({ length: 32 })
  rank!: string;

  @Property({ columnType: "smallint" })
  flags!: number;

  @Property({ columnType: "smallint" })
  excludeFlags!: number;

  @Property({ columnType: "smallint" })
  canEditFlags!: number;

  //Relations
  @OneToMany(() => Admin, "rank")
  r_admins = new Collection<Admin>(this);
}
