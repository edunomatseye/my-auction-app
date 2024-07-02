import { relations } from "drizzle-orm/relations";

import {
  countries,
  cities,
  groups,
  users,
  posts,
  profiles,
  todos,
  users_to_groups,
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

export const usersRelations = relations(users, ({ one, many }) => ({
  group: one(groups, {
    fields: [users.group_id],
    references: [groups.id],
  }),
  posts: many(posts),
  profiles: many(profiles),
  todos: many(todos),
  users_to_groups: many(users_to_groups),
}));

export const groupsRelations = relations(groups, ({ many }) => ({
  users: many(users),
  users_to_groups: many(users_to_groups),
}));

export const postsRelations = relations(posts, ({ one }) => ({
  user: one(users, {
    fields: [posts.author_id],
    references: [users.id],
  }),
}));

export const profilesRelations = relations(profiles, ({ one }) => ({
  user: one(users, {
    fields: [profiles.user_id],
    references: [users.id],
  }),
}));

export const todosRelations = relations(todos, ({ one }) => ({
  user: one(users, {
    fields: [todos.author_id],
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
