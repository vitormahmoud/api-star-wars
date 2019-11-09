const connector = require("./repository/Connection");
const app = require("./app");

connector
  .connect()
  .then(() => app.listen(3000))
  .catch(err => {
    console.error(
      "==================================================================================="
    );
    console.error(new Date());
    console.error(err);
    console.error(
      "==================================================================================="
    );
    process.exit(1);
  });
