import { relations } from "drizzle-orm/relations";

import {
  user,
  posts,
  countries,
  cities,
  profiles,
  session,
  users_to_groups,
  groups,
  authenticator,
  account,
} from "./schema";

export const postsRelations = relations(posts, ({ one }) => ({
  user: one(user, {
    fields: [posts.author_id],
    references: [user.id],
  }),
}));

export const userRelations = relations(user, ({ one, many }) => ({
  posts: many(posts),
  profiles: many(profiles),
  sessions: many(session),
  users_to_groups: many(users_to_groups),
  group: one(groups, {
    fields: [user.group_id],
    references: [groups.id],
  }),
  authenticators: many(authenticator),
  accounts: many(account),
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
  user: one(user, {
    fields: [profiles.user_id],
    references: [user.id],
  }),
}));

export const sessionRelations = relations(session, ({ one }) => ({
  user: one(user, {
    fields: [session.userId],
    references: [user.id],
  }),
}));

export const users_to_groupsRelations = relations(
  users_to_groups,
  ({ one }) => ({
    user: one(user, {
      fields: [users_to_groups.user_id],
      references: [user.id],
    }),
    group: one(groups, {
      fields: [users_to_groups.group_id],
      references: [groups.id],
    }),
  })
);

export const groupsRelations = relations(groups, ({ many }) => ({
  users_to_groups: many(users_to_groups),
  users: many(user),
}));

export const authenticatorRelations = relations(authenticator, ({ one }) => ({
  user: one(user, {
    fields: [authenticator.userId],
    references: [user.id],
  }),
}));

export const accountRelations = relations(account, ({ one }) => ({
  user: one(user, {
    fields: [account.userId],
    references: [user.id],
  }),
}));
