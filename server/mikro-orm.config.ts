import { UnderscoreNamingStrategy } from "@mikro-orm/core";
import type { Options } from "@mikro-orm/core/utils/Configuration";
import type { MariaDbDriver } from "@mikro-orm/mariadb";
import { TsMorphMetadataProvider } from "@mikro-orm/reflection";
import config from "config";

class PrefixedUnderscoreNamingStrategy extends UnderscoreNamingStrategy {
  classToTableName(entityName: string): string {
    return config.get<string>("dbPrefix") + super.classToTableName(entityName);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  joinKeyColumnName(entityName: string, _referencedColumnName?: string): string {
    return this.propertyToColumnName(entityName);
  }
}

export default {
  entities: ["./dbentities/**/*.(ts|js)"],
  entitiesTs: ["./dbentities/**/*.ts"],
  type: "mariadb",
  metadataProvider: TsMorphMetadataProvider,
  namingStrategy: PrefixedUnderscoreNamingStrategy,
  host: "localhost",
  port: 3306,
  user: "root",
  password: "root",
  dbName: "ss13",
} as Options<MariaDbDriver>;
