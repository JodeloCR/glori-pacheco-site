from __future__ import annotations

from pathlib import Path

from PIL import Image, ImageOps


ROOT = Path(__file__).resolve().parents[1]
SOURCE = Path.home() / "Downloads" / "Glori docs"
OUTPUT = ROOT / "public" / "images"

ASSETS = {
    # CAMM 2026 - Songwriting Camp con Sony Music Publishing (Panama)
    "IMG_4737.PNG": "camm-session.webp",
    "IMG_4738.PNG": "camm-team.webp",
    # Autoras Colab - Fondo Puntos de Cultura / Ministerio de Cultura y Juventud
    "757345831_18111848695978579_1902152638612977220_n (1).jpg.jpeg": "autoras-grupo.webp",
    "757596543_18111848713978579_4558694376351573611_n.jpg.jpeg": "autoras-taller.webp",
    "792053721_18115704547978579_8163527902458263771_n.jpg.jpeg": "autoras-porque.webp",
    "792029757_18115704571978579_4336643600489616759_n.jpg.jpeg": "autoras-fondo.webp",
}


def main() -> None:
    OUTPUT.mkdir(parents=True, exist_ok=True)
    for source_name, output_name in ASSETS.items():
        with Image.open(SOURCE / source_name) as image:
            image = ImageOps.exif_transpose(image).convert("RGB")
            image.thumbnail((1600, 1600), Image.Resampling.LANCZOS)
            image.save(OUTPUT / output_name, "WEBP", quality=84, method=6)
            size_kb = (OUTPUT / output_name).stat().st_size // 1024
            print(f"{output_name}: {image.width}x{image.height}  {size_kb}kB")


if __name__ == "__main__":
    main()
