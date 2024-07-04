import {
  pgTable,
  unique,
  pgEnum,
  integer,
  text,
  uniqueIndex,
  serial,
  varchar,
  timestamp,
  jsonb,
  uuid,
  date,
  boolean,
} from "drizzle-orm/pg-core";

export const popularity = pgEnum("popularity", ["unknown", "known", "popular"]);

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

export const users = pgTable("users", {
  id: serial("id").primaryKey().notNull(),
  name: text("name"),
  email: text("email"),
  password: text("password"),
  role: text("role"),
  created_at: timestamp("created_at", { mode: "string" }).defaultNow(),
  updated_at: timestamp("updated_at", { mode: "string" }),
  group_id: integer("group_id").references(() => groups.id),
});

export const posts = pgTable("posts", {
  id: serial("id").primaryKey().notNull(),
  title: text("title"),
  content: text("content"),
  author_id: integer("author_id")
    .notNull()
    .references(() => users.id),
});

export const profiles = pgTable("profiles", {
  id: serial("id").primaryKey().notNull(),
  user_id: integer("user_id")
    .notNull()
    .references(() => users.id),
  metadata: jsonb("metadata").default({ foo: "bar" }),
});

export const todos = pgTable("todos", {
  id: uuid("id").defaultRandom().primaryKey().notNull(),
  title: text("title"),
  description: text("description"),
  due_date: date("due_date"),
  completed: boolean("completed").default(false),
  author_id: integer("author_id")
    .default(2)
    .notNull()
    .references(() => users.id),
  created_at: timestamp("created_at", { mode: "string" }).defaultNow(),
  updated_at: timestamp("updated_at", { mode: "date", precision: 3 }).$onUpdate(
    () => new Date()
  ),
});

export const groups = pgTable("groups", {
  id: serial("id").primaryKey().notNull(),
  name: text("name"),
});

export const users_to_groups = pgTable("users_to_groups", {
  id: serial("id").primaryKey().notNull(),
  user_id: integer("user_id")
    .notNull()
    .references(() => users.id),
  group_id: integer("group_id")
    .notNull()
    .references(() => groups.id),
});
