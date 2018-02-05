import React from "react";
import cf from "currency-formatter";

export var toCurrency = number =>
  cf.format(number, { code: "INR", format: "%v" });
