import createStore, { storeLogger } from "../../core/store";
import reducer from "./reducer";

const { attach, connect, dispatch, useState, useEffect } = createStore(storeLogger(reducer));

window.dispatch = dispatch;

export {
  attach,
  connect,
  useState,
  useEffect
}
