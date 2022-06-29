const formidable = require("formidable");
const aws = require("aws-sdk");
aws.config.loadFromPath(__dirname + "/../config/s3.json");

exports.upload = function (req, res) {
    const form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        if (!files.image.size == 0) {
            const myFileName = files.image.originalFilename
                .split(".")
                .join("-" + Date.now() + ".");
            const s3 = new aws.S3();
            const params = {
                Bucket: "imcat-image",
                Key: myFileName,
                ACL: "public-read",
                Body: require("fs").createReadStream(files.image.filepath),
                ContentType: "image/jpeg",
            };
            s3.upload(params, function (err, data) {
                res.json({ url: data.Location });
            });
        }
        res.status(400).json({
            msg: "error image is empty",
        });
    });
};
