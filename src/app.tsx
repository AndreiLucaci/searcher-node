import { createRoot } from "react-dom/client";

import { Header } from "./components/header";
import { Body } from "./components/body";

const root = createRoot(document.body);
const body = (
  <>
    <Header />
    <Body />
  </>
);
root.render(body);
