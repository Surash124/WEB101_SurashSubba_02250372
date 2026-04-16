import formidable from "formidable";
import fs from "fs";
import path from "path";

export const config = {
  api: { bodyParser: false },
};

export default async function handler(req, res) {
  if (req.method === "POST") {
    const form = formidable({ multiples: false, maxFileSize: 5 * 1024 * 1024 });

    form.parse(req, (err, fields, files) => {
      if (err) return res.status(400).json({ error: err.message });

      const file = files.file;
      const uploadDir = path.join(process.cwd(), "public/uploads");
      if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

      const newPath = path.join(uploadDir, file.originalFilename);
      fs.renameSync(file.filepath, newPath);

      res.status(200).json({
        message: "File uploaded successfully",
        filename: file.originalFilename,
        mimetype: file.mimetype,
        size: file.size,
        url: `/uploads/${file.originalFilename}`,
      });
    });
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
