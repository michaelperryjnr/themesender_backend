export default interface IMessageMedia {
  url: string;
  type: "recordedAudio" | "audio" | "file" | "document" | "image" | "other";
  size: number;
  duration?: number;
}
