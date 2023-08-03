import { ConnectRouter } from "@bufbuild/connect";
import RestaurantsRouter from "./restaurants";

export default (router: ConnectRouter) => RestaurantsRouter(router);
