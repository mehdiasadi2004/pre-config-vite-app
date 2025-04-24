import { AxiosResponse } from "axios";
import Http from "../../interceptor/index.interceptor";
// import { TUserLogin, TUserLoginResponse }
import {
  useMutation,
  UseMutationResult,
  useQueryClient,
} from "@tanstack/react-query";
import { TBlogAddComment, TBlogAddCommentResponse } from "./type";
import toast from "react-hot-toast";

const blogAddComment = (
  data: TBlogAddComment
): Promise<AxiosResponse<TBlogAddCommentResponse>> =>
  Http.post("/News/CreateNewsComment", data );
// this should use in components
export const useBlogAddComment = (): UseMutationResult<
  AxiosResponse<TBlogAddCommentResponse, any>,
  unknown,
  TBlogAddComment,
  unknown
> => {
  const client = useQueryClient();
  return useMutation({
    mutationFn: blogAddComment,
    onSuccess: () => {
      toast.success("نظر شما با موفقیت ثبت شد")
      client.invalidateQueries({ queryKey: ["blogComment"] });
    },
    onError:(err:any)=>{
      err.response.data.ErrorMessage.map((e:string)=>toast.error(e))
    }
  });
};
