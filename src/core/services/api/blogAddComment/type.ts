export type TBlogAddComment = {
  newsId: string,
  title: string,
  describe: string,
};

export type TBlogAddCommentResponse = {
  message: string;
  success: boolean;
  errors: any;
  id:any
};