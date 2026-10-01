from __future__ import annotations

import hashlib
import sys
from pathlib import Path

from pypdf import PdfReader


def extract_images(pdf_path: Path, output_dir: Path) -> None:
    output_dir.mkdir(parents=True, exist_ok=True)
    reader = PdfReader(str(pdf_path))
    seen: set[str] = set()

    for page_number, page in enumerate(reader.pages, start=1):
        for image_number, image in enumerate(page.images, start=1):
            digest = hashlib.sha256(image.data).hexdigest()
            if digest in seen:
                continue
            seen.add(digest)

            suffix = Path(image.name).suffix or ".bin"
            output_path = output_dir / f"page-{page_number:02d}-image-{image_number:02d}{suffix}"
            output_path.write_bytes(image.data)
            print(f"{output_path.name}\t{len(image.data)}")


if __name__ == "__main__":
    if len(sys.argv) != 3:
        raise SystemExit("Usage: extract_pdf_images.py input.pdf output-dir")
    extract_images(Path(sys.argv[1]), Path(sys.argv[2]))
