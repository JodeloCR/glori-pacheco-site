from __future__ import annotations

import sys
from pathlib import Path

from pypdf import PdfReader


def extract_links(pdf_path: Path) -> None:
    reader = PdfReader(str(pdf_path))
    for page_number, page in enumerate(reader.pages, start=1):
        annotations = page.get("/Annots", [])
        for annotation_ref in annotations:
            annotation = annotation_ref.get_object()
            action = annotation.get("/A")
            if action and action.get("/URI"):
                print(f"page {page_number:02d}\t{action['/URI']}")


if __name__ == "__main__":
    if len(sys.argv) != 2:
        raise SystemExit("Usage: extract_pdf_links.py input.pdf")
    extract_links(Path(sys.argv[1]))
