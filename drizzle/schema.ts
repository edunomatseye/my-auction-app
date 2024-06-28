import {
  integer,
  pgEnum,
  pgTable,
  serial,
  uniqueIndex,
  varchar,
} from "drizzle-orm/pg-core";

// declaring enum in database
export var popularityEnum = pgEnum("popularity", [
  "unknown",
  "known",
  "popular",
]);

export var countries = pgTable(
  "countries",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 256 }),
  },
  (countries) => {
    return {
      nameIndex: uniqueIndex("name_idx").on(countries.name),
    };
  }
);

export var cities = pgTable("cities", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 256 }),
  countryId: integer("country_id").references(() => countries.id),
  popularity: popularityEnum("popularity"),
});
