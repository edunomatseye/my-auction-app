import type { AdapterAccountType } from "next-auth/adapters";

import {
  pgTable,
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
  primaryKey,
} from "drizzle-orm/pg-core";

export const popularity = pgEnum("popularity", ["unknown", "known", "popular"]);

export const accounts = pgTable(
  "account",
  {
    userId: uuid("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccountType>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
  })
);

export const sessions = pgTable("session", {
  sessionToken: text("sessionToken").primaryKey(),
  userId: uuid("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
});

export const verificationTokens = pgTable(
  "verificationToken",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (verificationToken) => ({
    compositePk: primaryKey({
      columns: [verificationToken.identifier, verificationToken.token],
    }),
  })
);

export const authenticators = pgTable(
  "authenticator",
  {
    userId: uuid("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    credentialID: text("credentialID").notNull().unique(),
    providerAccountId: text("providerAccountId").notNull(),
    credentialPublicKey: text("credentialPublicKey").notNull(),
    counter: integer("counter").notNull(),
    credentialDeviceType: text("credentialDeviceType").notNull(),
    credentialBackedUp: boolean("credentialBackedUp").notNull(),
    transports: text("transports"),
  },
  (authenticator) => ({
    compositePK: primaryKey({
      columns: [authenticator.userId, authenticator.credentialID],
    }),
  })
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

export const users = pgTable("user", {
  //id: serial("id").primaryKey().notNull(),
  // id: text("id")
  //   .primaryKey()
  //   .$defaultFn(() => crypto.randomUUID()),
  id: uuid("id").defaultRandom().primaryKey().notNull(),
  name: text("name"),
  email: text("email").notNull(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: text("image"),
  password: text("password"),
  role: text("role"),
  created_at: timestamp("created_at", { mode: "string" }).defaultNow(),
  updated_at: timestamp("updated_at", { mode: "date", precision: 3 }).$onUpdate(
    () => new Date()
  ),
  group_id: integer("group_id").references(() => groups.id),
});

export const posts = pgTable("posts", {
  id: serial("id").primaryKey().notNull(),
  title: text("title"),
  content: text("content"),
  author_id: uuid("author_id")
    .notNull()
    .references(() => users.id),
});

export const profiles = pgTable("profiles", {
  id: serial("id").primaryKey().notNull(),
  user_id: uuid("user_id")
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
  author_id: uuid("author_id")
    //.default("ATAddForeignKeyConstraint")
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
  user_id: uuid("user_id")
    .notNull()
    .references(() => users.id),
  group_id: integer("group_id")
    .notNull()
    .references(() => groups.id),
});
