import {
  pgTable,
  uniqueIndex,
  pgEnum,
  serial,
  varchar,
  integer,
  unique,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

export const popularity = pgEnum("popularity", ["unknown", "known", "popular"]);

export const countries = pgTable(
  "countries",
  {
    id: serial("id").primaryKey().notNull(),
    name: varchar("name", { length: 256 }),
  },
  (table) => {
    return {
      name_idx: uniqueIndex("name_idx").using("btree", table.name),
    };
  }
);

export const cities = pgTable("cities", {
  id: serial("id").primaryKey().notNull(),
  name: varchar("name", { length: 256 }),
  country_id: integer("country_id").references(() => countries.id),
  popularity: popularity("popularity"),
});

export const composite = pgTable(
  "composite",
  {
    id: integer("id"),
    name: text("name"),
  },
  (table) => {
    return {
      composite_id_name_unique: unique("composite_id_name_unique").on(
        table.id,
        table.name
      ),
    };
  }
);

export const users = pgTable("users", {
  id: serial("id").notNull(),
  name: text("name"),
  email: text("email"),
  password: text("password"),
  role: text("role"),
  created_at: timestamp("created_at", { mode: "string" }),
  updated_at: timestamp("updated_at", { mode: "string" }),
});
