import { AboutMe } from "./AboutMe.js";
import { Entry0 } from "./Entry0.js";
import { Entry1 } from "./Entry1.js";

export { EntryReturner }

function EntryReturner(i) {
  if (i == -1) { return AboutMe(); }
  const entries = [Entry0, Entry1];
  let func = entries[i];
  return func();
}