//@ts-ignore
import * as fcl from "@onflow/fcl";

fcl
  .config() // returns the config instance
  .put("foo", "bar") // configures "foo" to be "bar"
  .put("baz", "buz"); // configures "baz" to be "buz"
