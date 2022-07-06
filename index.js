const jsonServer = require("json-server");
const server = jsonServer.create();
var fs = require("fs");
var path = require("path");
var jsonPath = path.join(__dirname, "db.json");
const router = jsonServer.router(jsonPath);
const middlewares = jsonServer.defaults();

server.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

const names = [
  { name: "ETH", path: "/token-icon/eth.webp", fullname: "Ethereum" },
  { name: "USDC", path: "/token-icon/usdc.webp", fullname: "USD Coin" },
  { name: "DAI", path: "/token-icon/dai.webp", fullname: "Dai Stablecoin" },
  { name: "USDT", path: "/token-icon/usdt.webp", fullname: "Tether USD" },
  { name: "WBTC", path: "/token-icon/wbtc.webp", fullname: "Wrapped BTC" },
  { name: "1INCH", path: "/token-icon/1inch.webp", fullname: "1INCH Token" },
  { name: "UNI", path: "/token-icon/uni.webp", fullname: "Uniswap" },
];
const webs = ["1inch", "OTC", "Unifi"];
const prices = [
  30, 800, 6000, 13150, 15315, 1921, 0.45, 154, 316, 1849, 1464, 1546, 1164, 84,
  44941, 949,
];

server.use(jsonServer.bodyParser);

server.post("/change-price", (req, res) => {
  let fromValue = {};
  for (let i = 0; i < names.length; i++) {
    if (names[i].name.localeCompare(req.body.fromToken) === 0) {
      fromValue = names[i];
      break;
    }
  }

  let toValue = {};
  for (let i = 0; i < names.length; i++) {
    if (names[i].name.localeCompare(req.body.toToken) === 0) {
      toValue = names[i];
      break;
    }
  }

  const data = {
    from: {
      tokenCode: fromValue ? fromValue.name : "",
      path: fromValue ? fromValue.path : "",
      numberToken: req.body.numberToken,
      usdPrice: prices[Math.floor(Math.random() * prices.length)],
      fullname: fromValue ? fromValue.fullname : "",
    },
    to: {
      tokenCode: toValue ? toValue.name : "",
      path: toValue ? toValue.path : "",
      numberToken: req.body.numberToken,
      usdPrice: prices[Math.floor(Math.random() * prices.length)],
      fullname: fromValue ? fromValue.fullname : "",
    },
    quotesList: [],
  };
  const randomPrices = prices[Math.floor(Math.random() * prices.length)];
  for (let i = 0; i < 3; i++) {
    const randomName = webs[Math.floor(Math.random() * webs.length)];
    const returnNumberToken =
      (data.from.numberToken * data.from.usdPrice) / randomPrices;
    data.quotesList.push({
      id: i,
      name: `${randomName}`,
      usdPrice: `${randomPrices}`,
      numberToken: `${returnNumberToken}`,
    });
  }
  res.jsonp(data);
});

server.use(middlewares);
server.use(router);
server.listen(3000, () => {
  console.log("JSON Server is running");
});
