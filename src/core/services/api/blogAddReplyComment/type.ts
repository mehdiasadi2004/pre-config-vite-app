export type TBlogAddReplayComment = {
  newsId: string,
  title: string,
  describe: string,
  parentId: string
};

export type TBlogAddReplayCommentResponse = {
  message: string;
  success: boolean;
  errors: any;
  id:any
};