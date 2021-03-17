// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const QRCode = require('qrcode');
const cloudinary = require('cloudinary');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default async (req, res) => {
  return new Promise(async (resolve, reject) => {
    const { url } = req.query;
    QRCode.toDataURL(url, { type: 'terminal' }, async function (err, url) {
      const res1 = await cloudinary.uploader.upload(url, {
        upload_preset: 'dev_setup',
      });

      const image = await res1.secure_url;

      res.status(200).json({ qrCode: image });
      resolve();
    });
  });
};
