import boundaries from "eslint-plugin-boundaries";

export const eslintBoundariesConfig = {
  plugins: {
    boundaries,
  },
  settings: {
    "import/resolver": {
      typescript: {
        alwaysTryTypes: true,
      },
    },
    "boundaries/elements": [
      { type: "app",      pattern: "./src/app/**" },
      { type: "pages",    pattern: "./src/pages/**" },
      { type: "widgets",  pattern: "./src/widgets/**" },
      { type: "features", pattern: "./src/features/**" },
      { type: "entities", pattern: "./src/entities/**" },
      { type: "shared",   pattern: "./src/shared/**" },
    ],
  },
  rules: {
    "boundaries/element-types": [
      2,
      {
        default: "allow",
        rules: [
          {
            from: "shared",
            disallow: ["app", "pages", "widgets", "features", "entities"],
            message:
              "Модуль нижележащего слоя (${file.type}) не может импортировать модуль вышележащего слоя (${dependency.type})",
          },
          {
            from: "entities",
            disallow: ["app", "pages", "widgets", "features"],
            message:
              "Модуль нижележащего слоя (${file.type}) не может импортировать модуль вышележащего слоя (${dependency.type})",
          },
          {
            from: "features",
            disallow: ["app", "pages", "widgets"],
            message:
              "Модуль нижележащего слоя (${file.type}) не может импортировать модуль вышележащего слоя (${dependency.type})",
          },
          {
            from: "widgets",
            disallow: ["app", "pages"],
            message:
              "Модуль нижележащего слоя (${file.type}) не может импортировать модуль вышележащего слоя (${dependency.type})",
          },
          {
            from: "pages",
            disallow: ["app"],
            message:
              "Модуль нижележащего слоя (${file.type}) не может импортировать модуль вышележащего слоя (${dependency.type})",
          },
          {
            from: "app",
            disallow: [],
            message:
              "Модуль нижележащего слоя (${file.type}) не может импортировать модуль вышележащего слоя (${dependency.type})",
          },
        ],
      },
    ],
    "boundaries/entry-point": [
      2,
      {
        default: "disallow",
        message:
          "Модуль (${file.type}) должен импортироваться через public API. Прямой импорт из ${dependency.source} запрещен",
        rules: [
          {
            target: ["app"],
            allow: "*",
          },
          {
            target: ["pages", "widgets", "features", "entities", "shared"],
            allow: "index.(ts|tsx)",
          },
        ],
      },
    ],
  },
};
