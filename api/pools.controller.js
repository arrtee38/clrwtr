import PoolsDAO from "../dao/PoolsDAO.js";

export default class PoolsController {
  static async apiGetPools(req, res, next) {
    const poolsPerPage = req.query.poolsPerPage ? parseInt(req.query.poolsPerPage, 10) : 20;
    const page = req.query.page ? parseInt(req.query.page, 10) : 0;

    let filters = {};
    if (req.query.age) {
      filters.age = req.query.age;
    } else if (req.query.type) {
      filters.type = req.query.type;
    } else if (req.query.name) {
      filters.name = req.query.name;
    }

    const {poolsList, totalNumPools} = await PoolsDAO.getPools({
      filters,
      page,
      poolsPerPage,
    });

    let response = {
      pools: poolsList,
      page: page,
      filters: filters,
      entries_per_page: poolsPerPage,
      total_results: totalNumPools,
    };
    res.json(response);
  }

  /*
  static async apiGetRestaurantById(req, res, next) {
    try {
      let id = req.params.id || {}
      let restaurant = await RestaurantsDAO.getRestaurantByID(id)
      if (!restaurant) {
        res.status(404).json({ error: "Not found" })
        return
      }
      res.json(restaurant)
    } catch (e) {
      console.log(`api, ${e}`)
      res.status(500).json({ error: e })
    }
  }

  static async apiGetRestaurantCuisines(req, res, next) {
    try {
      let cuisines = await RestaurantsDAO.getCuisines()
      res.json(cuisines)
    } catch (e) {
      console.log(`api, ${e}`)
      res.status(500).json({ error: e })
    }
  }
  */
}