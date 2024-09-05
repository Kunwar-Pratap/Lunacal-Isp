export const validateImage = (image: File | null) => {
  if (!image) return "Image is required";
  const allowedTypes = ["image/jpeg", "image/png", "image/gif"];

  if (!allowedTypes.includes(image.type))
    return "Only JPEG, PNG, and GIF images are allowed";
  const maxSizeInMB = 5;

  if (image.size > maxSizeInMB * 1024 * 1024)
    return `Image size cannot exceed ${maxSizeInMB} MB`;

  return undefined;
};
