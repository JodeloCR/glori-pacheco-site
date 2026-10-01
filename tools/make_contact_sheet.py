from __future__ import annotations

import math
import sys
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont, ImageOps


def make_sheet(input_dir: Path, output_path: Path, columns: int = 5) -> None:
    paths = sorted(path for path in input_dir.iterdir() if path.is_file())
    thumb_width, thumb_height, label_height = 260, 180, 30
    rows = math.ceil(len(paths) / columns)
    sheet = Image.new("RGB", (columns * thumb_width, rows * (thumb_height + label_height)), "#111111")
    draw = ImageDraw.Draw(sheet)
    font = ImageFont.load_default(size=16)

    for index, path in enumerate(paths):
        with Image.open(path) as image:
            image = image.convert("RGB")
            thumb = ImageOps.fit(image, (thumb_width - 10, thumb_height - 10), method=Image.Resampling.LANCZOS)
        x = (index % columns) * thumb_width + 5
        y = (index // columns) * (thumb_height + label_height) + 5
        sheet.paste(thumb, (x, y))
        draw.text((x, y + thumb_height), path.name, fill="white", font=font)

    output_path.parent.mkdir(parents=True, exist_ok=True)
    sheet.save(output_path, quality=86)
    print(output_path)


if __name__ == "__main__":
    if len(sys.argv) != 3:
        raise SystemExit("Usage: make_contact_sheet.py image-dir output.jpg")
    make_sheet(Path(sys.argv[1]), Path(sys.argv[2]))
