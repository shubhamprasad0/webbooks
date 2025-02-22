import "dotenv/config";
import { readdirSync, readFileSync } from "node:fs";
import path, { dirname } from "path";
import { Sequelize } from "sequelize";

import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const rdsCa = readFileSync(
  path.resolve(__dirname, "..", "config", "certs", "global-bundle.pem")
);

const sequelize = new Sequelize(process.env.POSTGRES_URL, {
  dialect: "postgres",
  dialectOptions: {
    // ssl: {
    //   require: true,
    //   rejectUnauthorized: true,
    //   ca: [rdsCa],
    // },
  },
});

const modelFiles = readdirSync(path.resolve(__dirname, "models"));
await Promise.all(
  modelFiles.map(async (file) => {
    (await import(path.resolve(__dirname, "models", file))).default(sequelize);
  })
);

Object.keys(sequelize.models).forEach((modelName) => {
  const model = sequelize.models[modelName];
  if (model.associate) {
    model.associate(sequelize.models);
  }
});

await sequelize.sync();

export default sequelize;
