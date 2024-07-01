import { relations } from "drizzle-orm/relations";

import {
  countries,
  cities,
  users,
  users_to_groups,
  groups,
  profiles,
  posts,
  todos,
} from "./schema";

export const citiesRelations = relations(cities, ({ one }) => ({
  country: one(countries, {
    fields: [cities.country_id],
    references: [countries.id],
  }),
}));

export const countriesRelations = relations(countries, ({ many }) => ({
  cities: many(cities),
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

export const usersRelations = relations(users, ({ one, many }) => ({
  users_to_groups: many(users_to_groups),
  group: one(groups, {
    fields: [users.group_id],
    references: [groups.id],
  }),
  profile: one(profiles, {
    fields: [users.id],
    references: [profiles.id],
  }),
  posts: many(posts),
  todos: many(todos),
}));

export const groupsRelations = relations(groups, ({ many }) => ({
  users_to_groups: many(users_to_groups),
  users: many(users),
}));

export const postsRelations = relations(posts, ({ one }) => ({
  user: one(users, {
    fields: [posts.author_id],
    references: [users.id],
  }),
}));

export const todosRelations = relations(todos, ({ one }) => ({
  author: one(users, {
    fields: [todos.author_id],
    references: [users.id],
  }),
}));
