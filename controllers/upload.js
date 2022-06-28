const formidable = require("formidable");
const aws = require("aws-sdk");
aws.config.loadFromPath(__dirname + "/../config/s3.json");

module.exports.upload = function (req, res) {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        var s3 = new aws.S3();
        var params = {
            Bucket: "imcat-image",
            Key: new Date() + files.image.originalFilename,
            ACL: "public-read",
            Body: require("fs").createReadStream(files.image.filepath),
            ContentType: "image/jpeg",
        };
        s3.upload(params, function (err, data) {
            res.json({ url: data.Location });
        });
    });
};
