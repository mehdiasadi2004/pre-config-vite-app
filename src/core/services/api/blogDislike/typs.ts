export type TBlogDislike = {
    BlogId: string | undefined
};

export type TBlogDislikeResponse = {
    message: string;
    success: boolean;
    errors: any;
  };