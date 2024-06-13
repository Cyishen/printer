import { relations } from "drizzle-orm";
import { boolean, integer, pgEnum, pgTable, text, timestamp, serial, numeric } from "drizzle-orm/pg-core";

import { v4 as uuidv4 } from 'uuid';

export const CaseColor = pgEnum("caseColor", ["black", "blue", "rose"]);
export const PhoneModel = pgEnum("phoneModel", [
  "iphoneX", "iphone11", "iphone12","iphone13","iphone14","iphone15"
]);
export const CaseMaterial = pgEnum("CaseMaterial", ["silicone", "polycarbonate"]);
export const CaseFinish = pgEnum("CaseFinish", ["smooth", "textured"]);

//TODO:
export const Configuration = pgTable("Configuration", {
  id: text("id").primaryKey().default(uuidv4()),
  width: integer("width").notNull(),
  height: integer("height").notNull(),
  imageUrl: text("imageUrl").notNull(),
  color: CaseColor("color"),
  model: PhoneModel("model"),
  material: CaseMaterial("material"),
  finish: CaseFinish("finish"),
  croppedImageUrl: text("croppedImageUrl"),
});
// 一個配置可以有多個訂單? 是否改 one?
export const ConfigurationRelations = relations(Configuration, ({ many }) => ({
  orders: many(Order),
}));

export const User = pgTable("User", {
  userId: text("user_id").primaryKey(),
  email: text("email").notNull(),
  createdAt: timestamp("createdAt").defaultNow(),
  updatedAt: timestamp("updatedAt").defaultNow(),
});
// 用戶可以有多筆訂單
export const UserRelations = relations(User, ({ many }) => ({
  orders: many(Order),
}));

//TODO:
export const OrderStatus = pgEnum("orderStatus", ["awaiting_shipment", "shipped", "delivered"]);

export const Order = pgTable("Order", {
  id: serial("id").primaryKey(),
  configurationId: text("configurationId").notNull().references(() => Configuration.id),
  userId: text("user_Id").notNull().references(() => User.userId),

  amount: numeric("amount", { precision: 7, scale: 2 }).notNull(),
  isPaid: boolean("isPaid").default(false).notNull(),
  status: OrderStatus("status").default("awaiting_shipment").notNull(),
  createdAt: timestamp("createdAt").defaultNow(),
  updatedAt: timestamp("updatedAt").defaultNow(),
});
//一筆訂單: 只會連結到一個 Configuration配置 與 User用戶
export const OrderRelations = relations(Order, ({ one }) => ({
  configuration: one(Configuration, {
    fields: [Order.configurationId],
    references: [Configuration.id],
  }),
  user: one(User, {
    fields: [Order.userId],
    references: [User.userId],
  }),
}));


// export const ClothingConfig = pgTable("ClothingConfiguration", {
//   id: text("id").primaryKey().default(uuidv4()),
//   width: integer("width").notNull(),
//   height: integer("height").notNull(),
//   imageUrl: text("imageUrl").notNull(),
//   color: CaseColor("color"),
//   size: text("size"),
//   fabric: text("fabric"),
//   gender: text("gender"),
//   croppedImageUrl: text("croppedImageUrl"),
// });
// export const ClothConfigRelations = relations(ClothingConfig, ({ many }) => ({
//   orders: many(Order),
// }));