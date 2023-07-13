type OptimisationParams = {
  f?:
    | "avif"
    | "gif"
    | "jpeg"
    | "jpg"
    | "png"
    | "webp";

  w?: number;
  h?: number;

  /** Sets the quality of the image, allowing you to optimize your images for the web.
   * 1 = Lowest
   * 100 = Highest
   */
  q?: number;

  /** Sets the compression effort for the resulting image. Does not affect quality.
   * 1 = lowest compression, shortest processing time, but largest file size.
   * 100 = highest compression, longest processing time, and smallest file size.
   *
   * Only applies to: f=avif, f=gif, f=png and f=webp.
   */
  c?: number;

  fit?:
    /** Resizes the image to the given dimensions (see: w and h).
     * The resulting image may be cropped in one dimension to preserve the aspect ratio of the original image.
     * The cropped edges are determined by the crop parameter.
     *
     * •Resulting image size: = w x h
     * •Aspect ratio preserved: yes
     * •Cropping: yes
     *
     * Requires: h, w */
    | "crop"
    /** Enlarges the image to the given dimensions (see: w and h) but won't shrink images that already exceed the dimensions.
     * If enlargement occurs, the image will be enlarged until at least one dimension is equal to the given dimensions, while the other dimension will be ≤ the given dimensions.
     *
     * •Resulting image size: ≥ w | ≥ h
     * •Aspect ratio preserved: yes
     * •Cropping: no
     *
     * Requires: h, w */
    | "enlarge"
    /** Enlarges the image to the given dimensions (see: w and h) but won't shrink images that already exceed the dimensions.
     * If enlargement occurs, the resulting image's dimensions will be ≥ the given dimensions.
     *
     * •Resulting image size: ≥ w & ≥ h
     * •Aspect ratio preserved: yes
     * •Cropping: no
     *
     * Requires: h, w */
    | "enlarge-cover"
    /** Resizes the image to the given height (see: h).
     * Width will be automatically set to preserve the aspect ratio of the original image.
     *
     * •Resulting image size: = h
     * •Aspect ratio preserved: yes
     * •Cropping: no
     *
     * Requires: h */
    | "height"
    /** Resizes the image to the given dimensions (see: w and h).
     * The resulting image may be smaller in one dimension, while the other will match the given dimensions exactly.
     *
     * •Resulting image size: (≤ w & = h) | (= w & ≤ h)
     * •Aspect ratio preserved: yes
     * •Cropping: no
     *
     * Requires: h, w */
    | "max"
    /** Resizes the image to the given dimensions (see: w and h).
     * The resulting image may be larger in one dimension, while the other will match the given dimensions exactly.
     *
     * •Resulting image size: (≥ w & = h) | (= w & ≥ h)
     * •Aspect ratio preserved: yes
     * •Cropping: no
     *
     * Requires: h, w */
    | "min"
    /** Shrinks the image to the given dimensions (see: w and h) but won't enlarge images that are already below the dimensions.
     * If shrinking occurs, the resulting image's dimensions will be ≤ the given dimensions.
     *
     * •Resulting image size: ≤ w & ≤ h
     * •Aspect ratio preserved: yes
     * •Cropping: no
     *
     * Requires: h, w */
    | "shrink"
    /** Shrinks the image to the given dimensions (see: w and h) but won't enlarge images that are already below the dimensions.
     * If shrinking occurs, the image will be shrunk until at least one dimension is equal to the given dimensions, while the other dimension will be ≥ the given dimensions.
     *
     * •Resulting image size: ≤ w | ≤ h
     * •Aspect ratio preserved: yes
     * •Cropping: no
     *
     * Requires: h, w */
    | "shrink-cover"
    /** Resizes the image to the given dimensions, stretching to fit if required (see: w and h).
     *
     * •Resulting image size: = w x h
     * •Aspect ratio preserved: no
     * •Cropping: no
     *
     * Requires: h, w */
    | "stretch"
    /** Resizes the image to the given width (see: w).
     * Height will be automatically set to preserve the aspect ratio of the original image.
     *
     * •Resulting image size: = w
     * •Aspect ratio preserved: yes
     * •Cropping: no
     *
     * Requires: w */
    | "width";

  crop?:
    | "bottom"
    | "bottom-left"
    | "bottom-right"
    | "center"
    | "left"
    | "right"
    | "smart"
    | "smart-entropy"
    | "top"
    | "top-left"
    | "top-right";
};

export const uploadJSParams = (params: OptimisationParams) =>
  Object.entries(params)
    .reduce((acc, [key, value]) => {
      if (value) {
        acc.push(`${key}=${value}`);
      }
      return acc;
    }, [] as string[])
    .join("&");
