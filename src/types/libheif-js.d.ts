declare module "libheif-js/wasm-bundle" {
  type DisplayData = {
    data: Uint8ClampedArray
    width: number
    height: number
  }

  type HeifImage = {
    get_width(): number
    get_height(): number
    display(
      imageData: ImageData,
      callback: (displayData: DisplayData | null) => void
    ): void
  }

  type HeifDecoder = {
    decode(data: Uint8Array | ArrayBuffer): HeifImage[]
  }

  const libheif: {
    HeifDecoder: new () => HeifDecoder
  }

  export default libheif
}
