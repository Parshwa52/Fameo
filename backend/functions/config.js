import dotenv from "dotenv";
import assert from "assert";

dotenv.config();

const { FAMEO_PORT, FAMEO_HOST, FAMEO_HOST_URL } = process.env;

assert(FAMEO_PORT, "Port is required");
assert(FAMEO_HOST, "Host is required");

export default {
  port: FAMEO_PORT,
  host: FAMEO_HOST,
  hostUrl: FAMEO_HOST_URL,
};
