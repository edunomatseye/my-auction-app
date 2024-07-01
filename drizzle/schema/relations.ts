import { relations } from "drizzle-orm/relations";

import {
  countries,
  cities,
  users,
  users_to_chatgroups,
  chat_groups,
  profile_info,
  posts,
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

export const users_to_chatgroupsRelations = relations(
  users_to_chatgroups,
  ({ one }) => ({
    user: one(users, {
      fields: [users_to_chatgroups.user_id],
      references: [users.id],
    }),
    chat_group: one(chat_groups, {
      fields: [users_to_chatgroups.group_id],
      references: [chat_groups.id],
    }),
  })
);

export const usersRelations = relations(users, ({ one, many }) => ({
  users_to_chatgroups: many(users_to_chatgroups),
  chat_group: one(chat_groups, {
    fields: [users.chat_group_id],
    references: [chat_groups.id],
  }),
  profile_infos: many(profile_info),
  posts: many(posts),
}));

export const chat_groupsRelations = relations(chat_groups, ({ many }) => ({
  users_to_chatgroups: many(users_to_chatgroups),
  users: many(users),
}));

export const profile_infoRelations = relations(profile_info, ({ one }) => ({
  user: one(users, {
    fields: [profile_info.user_id],
    references: [users.id],
  }),
}));

export const postsRelations = relations(posts, ({ one }) => ({
  user: one(users, {
    fields: [posts.author_id],
    references: [users.id],
  }),
}));
