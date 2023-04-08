import path from "path";
import Post from "../models/post.model";
import UtilService from "./util.service";

export default class PostDatabaseService {
  private postFolder = path.resolve(__dirname, "../../db");
  private postPath = this.postFolder + "/posts.json";
  private currFileContents: Array<Post> | undefined;

  constructor(){}

  createPost(post: Post) {
    this.assureFileRead();
    let fileContents = UtilService.getFileContents(this.postPath);
    if (fileContents === undefined || fileContents === "")
      fileContents = "[]";
    this.currFileContents = JSON.parse(fileContents);
    this.currFileContents!.push(post);
    this.updatePostFile();
  };

  getPost({
    postTitle
  }: {
    postTitle: string;
  }): Post | null {
    this.assureFileRead();
    for (let val of this.currFileContents!)
      if (val.title === postTitle)
        return val;
    return null;
  }

  getPosts(): Array<Post> | undefined {
    this.assureFileRead();
    return this.currFileContents;
  }

  updatePostContents({
    postTitle,
    newContents,
    dateChange,
  }: {
    postTitle: string,
    newContents: string,
    dateChange: Date,
  }) {
    this.assureFileRead();
    for (let post of this.currFileContents!) {
      if (post.title === postTitle) {
        post.contents = newContents;
        post.updateDates.push(dateChange);
        break;
      }
    }
  }

  deletePost({
    postTitle
  }: {
    postTitle: string;
  }) {
    this.assureFileRead();
    let newFileContents: Array<Post> = [];
    this.currFileContents!.forEach((post: Post) => {
      if (post.title != postTitle)
        newFileContents.push(post);
    });
    this.currFileContents = newFileContents;
    this.updatePostFile();
  }

  private assureFileRead() {
    if (this.currFileContents === undefined) {
      let fileContents = UtilService.getFileContents(this.postPath);
      if (fileContents === undefined || fileContents.length < 1) {
        this.currFileContents = [];
      }
      else {
        this.currFileContents = JSON.parse(fileContents);
      }
    }
  }

  private updatePostFile() {
    UtilService.setFileContents(this.postPath, JSON.stringify(this.currFileContents));
  }
}
