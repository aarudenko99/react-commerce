"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var react_1 = __importDefault(require("react"));
var StyledButton_1 = __importDefault(require("./StyledButton"));
var OutlinedButton_1 = __importDefault(require("./OutlinedButton"));
exports.Button = function (_a) {
    var children = _a.children, outline = _a.outline, full = _a.full, secondary = _a.secondary, onClick = _a.onClick;
    return (react_1["default"].createElement(react_1["default"].Fragment, null, outline ? (react_1["default"].createElement(OutlinedButton_1["default"], { full: full, onClick: onClick, secondary: secondary }, children)) : (react_1["default"].createElement(StyledButton_1["default"], { full: full, onClick: onClick, secondary: secondary }, children))));
};
