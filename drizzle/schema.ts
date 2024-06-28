import {
  integer,
  pgEnum,
  pgTable,
  serial,
  uniqueIndex,
  varchar,
  text,
  unique,
  timestamp,
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

export const composite = pgTable(
  "composite",
  {
    id: integer("id"),
    name: text("name"),
  },
  (t) => ({
    unq: unique().on(t.id, t.name),
    unq2: unique("custom_name").on(t.id, t.name),
  })
);

export const user = pgTable("user", {
  id: serial("id"),
  name: text("name"),
  email: text("email"),
  password: text("password"),
  role: text("role").$type<"admin" | "customer">(),
  createdAt: timestamp("created_at"),
  updatedAt: timestamp("updated_at"),
});
