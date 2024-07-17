import {
	bigint,
	boolean,
	integer,
	jsonb,
	pgEnum,
	pgTable,
	primaryKey,
	serial,
	text,
	timestamp,
	unique,
	uniqueIndex,
	uuid,
	varchar,
} from "drizzle-orm/pg-core";

export const aal_level = pgEnum("aal_level", ["aal1", "aal2", "aal3"]);
export const code_challenge_method = pgEnum("code_challenge_method", [
	"s256",
	"plain",
]);
export const factor_status = pgEnum("factor_status", [
	"unverified",
	"verified",
]);
export const factor_type = pgEnum("factor_type", ["totp", "webauthn"]);
export const one_time_token_type = pgEnum("one_time_token_type", [
	"confirmation_token",
	"reauthentication_token",
	"recovery_token",
	"email_change_token_new",
	"email_change_token_current",
	"phone_change_token",
]);
export const key_status = pgEnum("key_status", [
	"default",
	"valid",
	"invalid",
	"expired",
]);
export const key_type = pgEnum("key_type", [
	"aead-ietf",
	"aead-det",
	"hmacsha512",
	"hmacsha256",
	"auth",
	"shorthash",
	"generichash",
	"kdf",
	"secretbox",
	"secretstream",
	"stream_xchacha20",
]);
export const popularity = pgEnum("popularity", ["unknown", "known", "popular"]);
export const action = pgEnum("action", [
	"INSERT",
	"UPDATE",
	"DELETE",
	"TRUNCATE",
	"ERROR",
]);
export const equality_op = pgEnum("equality_op", [
	"eq",
	"neq",
	"lt",
	"lte",
	"gt",
	"gte",
	"in",
]);

export const bPRbtHvpPTydfNdB = pgTable("bPRbtHvpPTydfNdB", {
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	id: bigint("id", { mode: "number" }).primaryKey().notNull(),
	created_at: timestamp("created_at", { withTimezone: true, mode: "string" })
		.defaultNow()
		.notNull(),
	updated_at: timestamp("updated_at", {
		withTimezone: true,
		mode: "string",
	}).defaultNow(),
	name: varchar("name"),
});

export const todos = pgTable("todos", {
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	id: bigint("id", { mode: "number" }).primaryKey().notNull(),
	title: varchar("title"),
	description: text("description"),
	completed: boolean("completed").default(false),
	created_at: timestamp("created_at", { withTimezone: true, mode: "string" })
		.defaultNow()
		.notNull(),
	updated_at: timestamp("updated_at", {
		withTimezone: true,
		mode: "string",
	}).defaultNow(),
	due_date: timestamp("due_date", { withTimezone: true, mode: "string" }),
	author_id: uuid("author_id").references(() => user.id, {
		onDelete: "cascade",
		onUpdate: "cascade",
	}),
});

export const profiles = pgTable("profiles", {
	id: serial("id").primaryKey().notNull(),
	user_id: uuid("user_id")
		.notNull()
		.references(() => user.id),
	metadata: jsonb("metadata").default({ foo: "bar" }),
});

export const session = pgTable("session", {
	sessionToken: text("sessionToken").primaryKey().notNull(),
	userId: uuid("userId")
		.notNull()
		.references(() => user.id, { onDelete: "cascade" }),
	expires: timestamp("expires", { mode: "string" }).notNull(),
});

export const user = pgTable("user", {
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

export const users_to_groups = pgTable("users_to_groups", {
	id: serial("id").primaryKey().notNull(),
	user_id: uuid("user_id")
		.notNull()
		.references(() => user.id),
	group_id: integer("group_id")
		.notNull()
		.references(() => groups.id),
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
	},
);

export const cities = pgTable("cities", {
	id: serial("id").primaryKey().notNull(),
	name: varchar("name", { length: 256 }),
	country_id: integer("country_id").references(() => countries.id),
	popularity: popularity("popularity"),
});

export const posts = pgTable("posts", {
	id: serial("id").primaryKey().notNull(),
	title: text("title"),
	content: text("content"),
	author_id: uuid("author_id")
		.notNull()
		.references(() => user.id),
});

export const groups = pgTable("groups", {
	id: serial("id").primaryKey().notNull(),
	name: text("name"),
});

export const verificationToken = pgTable(
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
	},
);

export const authenticator = pgTable(
	"authenticator",
	{
		userId: uuid("userId")
			.notNull()
			.references(() => user.id, { onDelete: "cascade" }),
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
				"authenticator_credentialID_unique",
			).on(table.credentialID),
		};
	},
);

export const account = pgTable(
	"account",
	{
		userId: uuid("userId")
			.notNull()
			.references(() => user.id, { onDelete: "cascade" }),
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
	},
);
