"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
require("./App.css");
var Product_tsx_1 = require("./components/Product.tsx");
function App() {
    var _a = (0, react_1.useState)([]), products = _a[0], setProducts = _a[1];
    var _b = (0, react_1.useState)(''), searchValue = _b[0], setSearchValue = _b[1];
    var apiEndpoint = 'https://fakestoreapi.com/products';
    var fetchProducts = function () {
        fetch(apiEndpoint)
            .then(function (res) { return res.json(); })
            .then(function (data) { return setProducts(data); });
    };
    (0, react_1.useEffect)(function () {
        fetchProducts();
    }, []);
    var searchProducts = function (category) {
        var productsMatchingSearch = fetch("".concat(apiEndpoint, "/category/").concat(category))
            .then(function (res) { return res.json(); })
            .then(function (stuff) { console.log(stuff); return stuff; })
            .then(function (data) { return setProducts(data); });
        return productsMatchingSearch;
    };
    return (react_1.default.createElement("div", { className: "app" },
        react_1.default.createElement("header", null,
            react_1.default.createElement("h1", null, "My Store"),
            react_1.default.createElement("label", { htmlFor: 'search' }, "Search by Category (electronics, jewelery, men's clothing, women's clothing)"),
            react_1.default.createElement("input", { type: 'text', id: 'search', onChange: function (e) { return setSearchValue(e.target.value); } }),
            react_1.default.createElement("button", { onClick: function () { return searchProducts(searchValue); } }, "Search")),
        react_1.default.createElement("main", null, products.length < 1 ? react_1.default.createElement("p", null, "No matching products, sorry") : react_1.default.createElement(Product_tsx_1.default, { productList: products }))));
}
exports.default = App;
