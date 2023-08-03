import { ConnectRouter } from "@bufbuild/connect";

import { RestaurantService } from "../gen/restaurant_connect";
import { Restaurant } from "../models";

export default (router: ConnectRouter) =>
  router.service(RestaurantService, {
    async create(req) {
      console.log(`Creating Record for ${req.name}`);
      let restaurantData = await Restaurant.create({
        name: req.name,
      });
      console.log(restaurantData);
      return {
        name: restaurantData.name,
        uuid: restaurantData.uuid,
      };
    },
    async readByKeyword(req) {
      console.log(`Keyword: ${req.keyword}`);
      let list = await Restaurant.find({
        name: {
          $regex: new RegExp(req.keyword, "i"),
        },
      });
      console.log(list);
      return {
        list,
      };
    },
    async readByUUID(req) {
      console.log(`UUID: ${req.uuid}`);
      let restaurant = await Restaurant.findOne({
        uuid: req.uuid,
      });
      if (restaurant === null) return {};
      return {
        name: restaurant.name,
        uuid: restaurant.uuid,
      };
    },
    async updateByUUID(req) {
      console.log(`UUID: ${req.uuid}`);
      let restaurant = await Restaurant.findOneAndUpdate(
        { uuid: req.uuid },
        {
          name: req.name,
        }
      );
      if (restaurant === null) return {};
      return {
        name: restaurant.name,
        uuid: restaurant.uuid,
      };
    },
    async deleteByUUID(req) {
      console.log(`UUID: ${req.uuid}`);
      let restaurant = await Restaurant.findOneAndDelete({ uuid: req.uuid });
      if (restaurant === null) return {};
      return {
        name: restaurant.name,
        uuid: restaurant.uuid,
      };
    },
    async deleteByKeyword(req) {
      console.log(`Keyword: ${req.keyword}`);
      let list = await Restaurant.find({
        name: {
          $regex: new RegExp(req.keyword, "i"),
        },
      });
      await Restaurant.deleteMany({
        name: {
          $regex: new RegExp(req.keyword, "i"),
        },
      });
      return {
        list,
      };
    },
  });
