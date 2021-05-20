const csv = require("csv-parser");
const fs = require("fs");
const remoteFileSize = require("remote-file-size");
let rows = [];

fs.createReadStream("abusing.csv")
  .pipe(csv())
  .on("data", (row) => {
    const oldUrl = new URL(row["Last url"]);
    let newUrl = new URL(row["Last url"]);
    if (newUrl.searchParams.get("width")) {
      newUrl.searchParams.set("width", newUrl.searchParams.get("width") * 2);
      if (newUrl.href !== oldUrl.href) {
        remoteFileSize(oldUrl.href, function (err, o) {
          remoteFileSize(decodeURIComponent(newUrl.href), function (err, s) {
            if (o && s) {
              console.log(o != s);
              console.log(`old url ${oldUrl.href}`);
              console.log(`old filessize ${o}`);
              console.log(`modified url ${decodeURIComponent(newUrl.href)}`);
              console.log(`new filessize ${s}`);
              rows.push(o != s);
              let truesLength = rows.filter(x=> x === true).length
              console.log(`percentage: ${truesLength/rows.length}`)
            }
            return;
          });
        });
        return;
      }
    }
  })
  .on("end", () => {});
