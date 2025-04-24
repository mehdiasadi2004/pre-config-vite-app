import { AxiosResponse } from "axios";
import Http from "../../interceptor/index.interceptor";
// import { TUserLogin, TUserLoginResponse }
import {
  useMutation,
  UseMutationResult,
  useQueryClient,
} from "@tanstack/react-query";
import { TBlogAddRate, TBlogAddRateResponse } from "./type";
import toast from "react-hot-toast";


const blogAddRate = (
  params: TBlogAddRate
): Promise<AxiosResponse<TBlogAddRateResponse>> =>
  Http.post("/News/NewsRate", null,{params:params} );
// this should use in components
export const useBlogAddRate = (): UseMutationResult<
  AxiosResponse<TBlogAddRateResponse, any>,
  unknown,
  TBlogAddRate,
  unknown
> => {
  const client = useQueryClient();
  return useMutation({
    mutationFn: blogAddRate,
    onSuccess: () => {
      toast.success("امتیاز شما با موفقیت ثبت شد")
      client.invalidateQueries({ queryKey: ["BlogDetail"] });
    },
    onError:(err:any)=>{
      err.response.data.ErrorMessage.map((e:string)=>toast.error(e))
    }
  });
};
