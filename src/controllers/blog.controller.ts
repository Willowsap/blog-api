import { Request, Response, NextFunction } from "express";
import PostDatabaseService from "../services/post-database.service";

export default class BlogController {

  private postDatabaseService;

  constructor(pdbs: PostDatabaseService) {
    this.postDatabaseService = pdbs;
  }

  /*
   * Expects body with:
   *    postTitle
   *    postContents
   *    postAuthor
   *    postDate
   */
  createPost = (req: Request, res: Response, next: NextFunction) => {
    let post = {
      id: req.body.postTitle as string + Date.now().toFixed(),
      title: req.body.postTitle as string,
      contents: req.body.postContents as string,
      author: req.body.postAuthor as string,
      creationDate: new Date(req.params.body as string),
      updateDates: []
    };
    this.postDatabaseService
      .createPost(post)
      res.status(201).json({post: post});
  };

  /*
   * Expects params with:
   *    postTitle
   */
  getPost = (req: Request, res: Response, next: NextFunction) => {
    res.status(201).json(
      {post: this.postDatabaseService.getPost({postTitle: req.params.postTitle})}
    );
  }

  /*
   * No body or params expectations.
   */
  getAllPosts = (req: Request, res: Response, next: NextFunction) => {
    let posts = this.postDatabaseService.getPosts();
    if (posts === undefined) {
      posts = []; 
    }
    res.status(201).json({posts: posts});
  }

  /*
   * Expects params with:
   *    postTitle 
   * Expects body with:
   *    postContents
   */
  updatePostContents = (req: Request, res: Response, next: NextFunction) => {
    this.postDatabaseService.updatePostContents({
      postTitle: req.params.postTitle,
      newContents: req.body.postContents,
      dateChange: new Date()
    });
    res.status(200);
  }

  /*
   * Expects params with:
   *    postTitle
   */
  deletePost = (req: Request, res: Response, next: NextFunction) => {
    this.postDatabaseService.deletePost({postTitle: req.params.postTitle});
    res.status(200);
  }
}