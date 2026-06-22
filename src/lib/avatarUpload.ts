const MAX_BYTES = 512_000;
const MAX_DIMENSION = 256;

/** Resize and compress an image file to a data URL suitable for profile storage. */
export async function prepareAvatarDataUrl(file: File): Promise<string> {
  if (!file.type.startsWith("image/")) {
    throw new Error("Please choose an image file.");
  }
  if (file.size > 5 * 1024 * 1024) {
    throw new Error("Image must be under 5 MB.");
  }

  const bitmap = await createImageBitmap(file);
  const scale = Math.min(1, MAX_DIMENSION / Math.max(bitmap.width, bitmap.height));
  const width = Math.max(1, Math.round(bitmap.width * scale));
  const height = Math.max(1, Math.round(bitmap.height * scale));

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Could not process image.");

  ctx.drawImage(bitmap, 0, 0, width, height);
  bitmap.close();

  let quality = 0.88;
  let dataUrl = canvas.toDataURL("image/jpeg", quality);
  while (dataUrl.length > MAX_BYTES && quality > 0.4) {
    quality -= 0.08;
    dataUrl = canvas.toDataURL("image/jpeg", quality);
  }

  if (dataUrl.length > MAX_BYTES) {
    throw new Error("Image is too large after compression. Try a smaller photo.");
  }

  return dataUrl;
}
