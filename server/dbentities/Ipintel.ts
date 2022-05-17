import { Entity, Index, PrimaryKey, PrimaryKeyProp, PrimaryKeyType, Property } from "@mikro-orm/core";

@Entity()
@Index({ name: "idx_ipintel", properties: ["ip", "intel", "date"] })
export class Ipintel {
  [PrimaryKeyProp]: "ip";
  [PrimaryKeyType]: number;

  @PrimaryKey()
  ip!: number;

  @Property({ defaultRaw: `current_timestamp()` })
  date!: Date;

  @Property({ columnType: "double", defaultRaw: `0` })
  intel!: string;
}
