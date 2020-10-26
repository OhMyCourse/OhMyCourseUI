export class CourseWithImage {
  constructor(
    public id: number,
    public name: string,
    public description: string,
    public mediaId: number,
    public imageSrc?: string
  ) {}

  loadImage(image: Blob) {
    let reader = new FileReader();
    reader.onload = (event) => {
      this.imageSrc = (event.target as FileReader).result as string;
    };
    reader.readAsDataURL(image);
  }
}
