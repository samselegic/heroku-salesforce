const https = require("https");
var fs = require("fs");
const jsforce = require("jsforce");
const USER_NAME = "sam@selegic.com.cpq";
const PASSWORD = "twentyhelo1";
var fileOnServer = "./path/output.pdf";

module.exports.downloadFile = async (req, res) => {
  try {
    const conn = await new jsforce.Connection();

    conn.login(USER_NAME, PASSWORD, function (err, res) {
      if (err) {
        return console.error(err);
      }

      // logged in user property
      console.log("User ID: " + res.id);
      console.log("Org ID: " + res.organizationId);

      downloadFile(conn);
    });

    function downloadFile(conn) {
      const options = {
        hostname: "indiacpq92sam92com-dev-ed.my.salesforce.com",
        port: 443,
        // path: "/services/data/v49.0/sobjects/ContentVersion/0685g000004sFR1AAM/VersionData",
        path: "/services/data/v51.0/sobjects/Document/0155g00000063jAAAQ/Body",
        // path: "/services/data/v51.0/sobjects/Attachment/00P5g000002ppjoEAA/Body",
        method: "GET",
        headers: {
          "Content-Type": "blob",
          Authorization: "OAuth " + conn.accessToken,
        },
      };

      var req = https.request(options, function (res) {
        var chunks = [];

        res.on("data", function (chunk) {
          chunks.push(chunk);
        });

        res.on("end", function (chunk) {
          var body = Buffer.concat(chunks);
          fs.writeFileSync("./path/output.pdf", body);
        });

        res.on("error", function (error) {
          console.error(error);
        });
      });

      req.end();
    }

    return res.status(200).json({
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
    });
  }
};

module.exports.uploadFile = async (req, res) => {
  try {
    const conn = await new jsforce.Connection();

    conn.login(USER_NAME, PASSWORD, function (err, res) {
      if (err) {
        return console.error(err);
      }
      fs.readFile(fileOnServer, function (err, filedata) {
        if (err) {
          console.error(err);
        } else {
          var base64data = new Buffer.from(filedata).toString("base64");
          conn.sobject("Document").create(
            {
              name: "abc.pdf",
              //   ParentId: "a0r5g00000024GQAAY",
              FolderId: "0055g00000C6vds",
              //   SBQQ__ExternalId__c: "0685g000004sFR1AAw",
              body: base64data,
            },
            function (err, uploadeddata) {
              console.log(err, uploadeddata);
            }
          );
        }
      });
    });
    return res.status(200).json({
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
    });
  }
};
