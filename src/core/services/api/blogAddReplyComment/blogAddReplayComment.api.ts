import { AxiosResponse } from "axios";
import Http from "../../interceptor/index.interceptor";
// import { TUserLogin, TUserLoginResponse }
import {
  useMutation,
  UseMutationResult,
  useQueryClient,
} from "@tanstack/react-query";
import { TBlogAddReplayComment, TBlogAddReplayCommentResponse } from "./type";
import toast from "react-hot-toast";

const blogAddReplayComment = (
  data: TBlogAddReplayComment
): Promise<AxiosResponse<TBlogAddReplayCommentResponse>> =>
  Http.post("/News/CreateNewsReplyComment", data );
// this should use in components
export const useBlogAddReplayComment = (): UseMutationResult<
  AxiosResponse<TBlogAddReplayCommentResponse, any>,
  unknown,
  TBlogAddReplayComment,
  unknown
> => {
  const client = useQueryClient();
  return useMutation({
    mutationFn: blogAddReplayComment,
    onSuccess: () => {
      toast.success("نظر شما با موفقیت افزوده شد")
      client.invalidateQueries({ queryKey: ["blogReplayComment"] });
    },
    onError:(err:any)=>{
      err.response.data.ErrorMessage.map((e:string)=>toast.error(e))
    }
  });
};
