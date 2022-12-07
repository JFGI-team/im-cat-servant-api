const formidable = require("formidable");
const aws = require("aws-sdk");
aws.config.loadFromPath(__dirname + "/../config/s3.json");
const sharp = require("sharp");

exports.upload = function (req, res, next) {
    const form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        if (files.image.size == 0) {
            res.status(400).json({ error: "ERROR_EMPTY_IMAGE" });
        } else {
            const s3 = new aws.S3();
            const body = sharp(files.image.filepath).resize(128, 128).jpeg();
            const myFileName = files.image.originalFilename
                .split(".")
                .join("-" + Date.now() + ".");
            const params = {
                Bucket: "imcat-image",
                Key: myFileName,
                ACL: "public-read",
                Body: body,
                ContentType: "image/jpeg",
            };
            s3.upload(params, function (err, data) {
                res.json({ url: data.Location });
                res.locals.url = data.Location;
                next();
            });
        }
    });
};
