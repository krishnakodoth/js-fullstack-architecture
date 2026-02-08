const app = require('./src/infrastructure/http/express');

app.listen(3000, () => {
  console.log("Clean architecture running on 3000");
});
