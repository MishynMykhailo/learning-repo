export interface Post {
  id: string;
  title: string;
  content: string;
  author: string;
  createdAt: string;
  updatedAt: string;
  comments?: Array<Icomment>;
}
export interface Comment {
  id: string;
  author: string;
  text: string;
}
