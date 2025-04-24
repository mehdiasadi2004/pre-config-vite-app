export type TBlogAddRate = {
  NewsId:string
  RateNumber:number
};

export type TBlogAddRateResponse = {
  message: string;
  success: boolean;
  errors: any;
};