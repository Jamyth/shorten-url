import { WebpackRunner } from "@iamyth/webpack-runner";
import path from "path";

new WebpackRunner({
  apiProxy: {
    target: "http://localhost:3000",
    context: ["/v1"],
  },
  port: 8080,
  projectDirectory: path.join(__dirname, ".."),
  tsconfigFilePath: path.join(__dirname, "../config/tsconfig.src.json"),
}).run();
