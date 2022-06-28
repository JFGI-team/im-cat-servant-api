const formidable = require("formidable");
const aws = require("aws-sdk");
aws.config.loadFromPath(__dirname + "/../config/s3.json");

module.exports.upload = function (req, res) {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        myFileName = files.image.originalFilename // .jpg 분리하고 타임스탬프로 파일이름 중복시 구분
            .split(".")
            .join("-" + Date.now() + ".");
        var s3 = new aws.S3();
        var params = {
            Bucket: "imcat-image",
            Key: myFileName,
            ACL: "public-read",
            Body: require("fs").createReadStream(files.image.filepath),
            ContentType: "image/jpeg",
        };
        s3.upload(params, function (err, data) {
            res.json({ url: data.Location });
        });
    });
};
