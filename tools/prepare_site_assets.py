from __future__ import annotations

from pathlib import Path

from PIL import Image, ImageOps


ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "tmp" / "extracted" / "epk"
OUTPUT = ROOT / "public" / "images"

ASSETS = {
    "page-09-image-02.jpg": "hero-purple.webp",
    "page-09-image-01.jpg": "portrait-pink.webp",
    "page-09-image-03.jpg": "portrait-neon.webp",
    "page-01-image-01.jpg": "portrait-journal.webp",
    "page-03-image-01.jpg": "live-close.webp",
    "page-04-image-03.jpg": "live-audience.webp",
    "page-04-image-04.jpg": "live-stage.webp",
    "page-08-image-01.jpg": "festival-stage.webp",
    "page-08-image-02.jpg": "festival-day.webp",
    "page-08-image-03.jpg": "festival-dance.webp",
    "page-06-image-01.png": "chapter-01-fuckboy.webp",
    "page-06-image-02.jpg": "chapter-02-toxico.webp",
    "page-06-image-03.jpg": "chapter-03-perdon.webp",
    "page-06-image-04.jpg": "chapter-04-todo-menos-amigos.webp",
    "page-07-image-01.jpg": "chapter-05-bang-bang.webp",
    "page-07-image-02.jpg": "chapter-06-quiero-llorar.webp",
    "page-07-image-03.jpg": "chapter-07-no-me-arrepiento.webp",
    "page-07-image-04.png": "chapter-08-mejor-sola.webp",
}


def main() -> None:
    OUTPUT.mkdir(parents=True, exist_ok=True)
    for source_name, output_name in ASSETS.items():
        with Image.open(SOURCE / source_name) as image:
            image = ImageOps.exif_transpose(image).convert("RGB")
            image.thumbnail((1800, 1800), Image.Resampling.LANCZOS)
            image.save(OUTPUT / output_name, "WEBP", quality=84, method=6)
            print(f"{output_name}: {image.width}x{image.height}")


if __name__ == "__main__":
    main()
