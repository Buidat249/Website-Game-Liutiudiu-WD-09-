import Order from "../models/Order";

export async function chartData(req, res) {
  try {
    let { startDate, endDate } = req.query;

    const now = new Date();
    if (!startDate) {
      startDate = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();
    }
    if (!endDate) {
      endDate = new Date(
        now.getFullYear(),
        now.getMonth() + 1,
        0
      ).toISOString();
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (isNaN(start) || isNaN(end)) {
      return res
        .status(400)
        .json({ message: "Invalid date format. Use YYYY-MM-DD." });
    }

    const orders = await Order.find({
      createdAt: { $gte: start, $lte: end },
    });

    const dataMap = {};

    orders.forEach((order) => {
      const date = order.createdAt.toISOString().split("T")[0];
      if (!dataMap[date]) {
        dataMap[date] = 0;
      }
      dataMap[date] += order.total_price;
    });

    const labels = Object.keys(dataMap).sort();
    const dataPoints = labels.map((label) => dataMap[label]);

    const chartData = {
      labels,
      datasets: [
        {
          label: "Total Sales",
          data: dataPoints,
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
        },
      ],
    };

    res.json(chartData);
  } catch (error) {
    console.error("Error generating chart data:", error);
    res.status(500).json({ message: "Internal server error", error });
  }
}

export async function bestSellingGame(req, res) {
  try {
    let { startDate, endDate, limit } = req.query;

    const now = new Date();
    if (!startDate) {
      startDate = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();
    }
    if (!endDate) {
      endDate = new Date(
        now.getFullYear(),
        now.getMonth() + 1,
        0
      ).toISOString();
    }
    if (!limit || isNaN(limit)) {
      limit = 10; // Default top 10
    }
    limit = parseInt(limit);

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (isNaN(start) || isNaN(end)) {
      return res
        .status(400)
        .json({ message: "Invalid date format. Use YYYY-MM-DD." });
    }

    const orders = await Order.find({
      createdAt: { $gte: start, $lte: end },
    });

    const gameSales = {};

    orders.forEach((order) => {
      order.games.forEach((game) => {
        if (!gameSales[`${game.name}_${game.game_id}`]) {
          gameSales[`${game.name}_${game.game_id}`] = 0;
        }
        gameSales[`${game.name}_${game.game_id}`] += game.quantity;
      });
    });

    const bestSelling = Object.entries(gameSales)
      .sort((a, b) => b[1] - a[1])
      .slice(0, limit)
      .map(([name, quantity]) => ({
        name: name.split("_")[0],
        game_id: name.split("_")[1],
        quantity,
      }));

    res.json(bestSelling);
  } catch (error) {
    console.error("Error fetching best-selling game:", error);
    res.status(500).json({ message: "Internal server error", error });
  }
}

export async function highestGrossingGame(req, res) {
  try {
    let { startDate, endDate, limit } = req.query;

    const now = new Date();
    if (!startDate) {
      startDate = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();
    }
    if (!endDate) {
      endDate = new Date(
        now.getFullYear(),
        now.getMonth() + 1,
        0
      ).toISOString();
    }
    if (!limit || isNaN(limit)) {
      limit = 10; // Default top 10
    }
    limit = parseInt(limit);

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (isNaN(start) || isNaN(end)) {
      return res
        .status(400)
        .json({ message: "Invalid date format. Use YYYY-MM-DD." });
    }

    const orders = await Order.find({
      createdAt: { $gte: start, $lte: end },
    });

    const gameRevenue = {};

    orders.forEach((order) => {
      order.games.forEach((game) => {
        if (!gameRevenue[`${game.name}_${game.game_id}`]) {
          gameRevenue[`${game.name}_${game.game_id}`] = 0;
        }
        gameRevenue[`${game.name}_${game.game_id}`] +=
          game.final_price * game.quantity;
      });
    });

    const highestGrossing = Object.entries(gameRevenue)
      .sort((a, b) => b[1] - a[1])
      .slice(0, limit)
      .map(([name, revenue]) => ({
        name: name.split("_")[0],
        game_id: name.split("_")[1],
        revenue,
      }));

    res.json(highestGrossing);
  } catch (error) {
    console.error("Error fetching highest-grossing game:", error);
    res.status(500).json({ message: "Internal server error", error });
  }
}