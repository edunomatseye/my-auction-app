import {
  pgTable,
  pgEnum,
  serial,
  text,
  uuid,
  uniqueIndex,
  varchar,
  integer,
  jsonb,
  timestamp,
  date,
  boolean,
  primaryKey,
  unique,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

export const popularity = pgEnum("popularity", ["unknown", "known", "popular"]);

export const posts = pgTable("posts", {
  id: serial("id").primaryKey().notNull(),
  title: text("title"),
  content: text("content"),
  author_id: uuid("author_id")
    .notNull()
    .references(() => users.id),
});

export const groups = pgTable("groups", {
  id: serial("id").primaryKey().notNull(),
  name: text("name"),
});

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

export const profiles = pgTable("profiles", {
  id: serial("id").primaryKey().notNull(),
  user_id: uuid("user_id")
    .notNull()
    .references(() => users.id),
  metadata: jsonb("metadata").default({ foo: "bar" }),
});

export const sessions = pgTable("session", {
  sessionToken: text("sessionToken").primaryKey().notNull(),
  userId: uuid("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "string" }).notNull(),
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

export const users = pgTable("user", {
  id: uuid("id").defaultRandom().primaryKey().notNull(),
  name: text("name"),
  email: text("email").notNull(),
  emailVerified: timestamp("emailVerified", { mode: "string" }),
  image: text("image"),
  password: text("password"),
  role: text("role"),
  created_at: timestamp("created_at", { mode: "string" }).defaultNow(),
  updated_at: timestamp("updated_at", { precision: 3, mode: "string" }),
  group_id: integer("group_id").references(() => groups.id),
});

export const todos = pgTable("todos", {
  id: uuid("id").defaultRandom().primaryKey().notNull(),
  title: text("title"),
  description: text("description"),
  due_date: date("due_date"),
  completed: boolean("completed").default(false),
  author_id: uuid("author_id")
    .default(sql`'65831ea6-92e5-4891-8e74-f07d62a7c147'`)
    .notNull(),
  created_at: timestamp("created_at", { mode: "string" }).defaultNow(),
  updated_at: timestamp("updated_at", { precision: 3, mode: "string" }),
});

export const verificationTokens = pgTable(
  "verificationToken",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires", { mode: "string" }).notNull(),
  },
  (table) => {
    return {
      verificationToken_identifier_token_pk: primaryKey({
        columns: [table.identifier, table.token],
        name: "verificationToken_identifier_token_pk",
      }),
    };
  }
);

export const authenticators = pgTable(
  "authenticator",
  {
    userId: uuid("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    credentialID: text("credentialID").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    credentialPublicKey: text("credentialPublicKey").notNull(),
    counter: integer("counter").notNull(),
    credentialDeviceType: text("credentialDeviceType").notNull(),
    credentialBackedUp: boolean("credentialBackedUp").notNull(),
    transports: text("transports"),
  },
  (table) => {
    return {
      authenticator_userId_credentialID_pk: primaryKey({
        columns: [table.userId, table.credentialID],
        name: "authenticator_userId_credentialID_pk",
      }),
      authenticator_credentialID_unique: unique(
        "authenticator_credentialID_unique"
      ).on(table.credentialID),
    };
  }
);

export const accounts = pgTable(
  "account",
  {
    userId: uuid("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").notNull(),
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
  (table) => {
    return {
      account_provider_providerAccountId_pk: primaryKey({
        columns: [table.provider, table.providerAccountId],
        name: "account_provider_providerAccountId_pk",
      }),
    };
  }
);
