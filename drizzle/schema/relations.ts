import { relations } from "drizzle-orm/relations";

import {
  users,
  posts,
  countries,
  cities,
  profiles,
  sessions,
  users_to_groups,
  groups,
  authenticators,
  accounts,
} from "./schema";

export const postsRelations = relations(posts, ({ one }) => ({
  user: one(users, {
    fields: [posts.author_id],
    references: [users.id],
  }),
}));

export const userRelations = relations(users, ({ one, many }) => ({
  posts: many(posts),
  profiles: many(profiles),
  sessions: many(sessions),
  users_to_groups: many(users_to_groups),
  group: one(groups, {
    fields: [users.group_id],
    references: [groups.id],
  }),
  authenticators: many(authenticators),
  accounts: many(accounts),
}));

export const citiesRelations = relations(cities, ({ one }) => ({
  country: one(countries, {
    fields: [cities.country_id],
    references: [countries.id],
  }),
}));

export const countriesRelations = relations(countries, ({ many }) => ({
  cities: many(cities),
}));

export const profilesRelations = relations(profiles, ({ one }) => ({
  user: one(users, {
    fields: [profiles.user_id],
    references: [users.id],
  }),
}));

export const sessionRelations = relations(sessions, ({ one }) => ({
  user: one(users, {
    fields: [sessions.userId],
    references: [users.id],
  }),
}));

export const users_to_groupsRelations = relations(
  users_to_groups,
  ({ one }) => ({
    user: one(users, {
      fields: [users_to_groups.user_id],
      references: [users.id],
    }),
    group: one(groups, {
      fields: [users_to_groups.group_id],
      references: [groups.id],
    }),
  })
);

export const groupsRelations = relations(groups, ({ many }) => ({
  users_to_groups: many(users_to_groups),
  users: many(users),
}));

export const authenticatorRelations = relations(authenticators, ({ one }) => ({
  user: one(users, {
    fields: [authenticators.userId],
    references: [users.id],
  }),
}));

export const accountRelations = relations(accounts, ({ one }) => ({
  user: one(users, {
    fields: [accounts.userId],
    references: [users.id],
  }),
}));
