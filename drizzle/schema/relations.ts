import { relations } from "drizzle-orm/relations";

import { countries, cities, users, profileInfo } from "./schema";

export const citiesRelations = relations(cities, ({ one }) => ({
  country: one(countries, {
    fields: [cities.country_id],
    references: [countries.id],
  }),
}));

export const countriesRelations = relations(countries, ({ many }) => ({
  cities: many(cities),
}));

export const usersRelations = relations(users, ({ one }) => ({
  profile_info: one(profileInfo, {
    fields: [users.id],
    references: [profileInfo.user_id],
  }),
}));
