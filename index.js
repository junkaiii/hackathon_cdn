const csv = require("csv-parser");
const fs = require("fs");
const remoteFileSize = require('remote-file-size');

fs.createReadStream("abusing.csv")
  .pipe(csv())
  .on("data", (row) => {
    const oldUrl = new URL(row["Last url"]);
    let newUrl = new URL(row["Last url"]);
    newUrl.searchParams.set("width", newUrl.searchParams.get("width") * 2);
    if (newUrl.href !== oldUrl.href) {
        remoteFileSize(oldUrl.href, function(err, o) {
            remoteFileSize(newUrl.href, function(err, s) {
                console.log(o < s)
                console.log(oldUrl.href)
                console.log(newUrl.href)
                console.log('done')
                return;
              })
          })
          return;
    }
  });
