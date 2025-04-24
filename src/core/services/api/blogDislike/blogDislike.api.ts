import { AxiosResponse } from "axios";
import { TBlogDislike, TBlogDislikeResponse } from "./typs";
import Http from '../../interceptor/index.interceptor';
import { useMutation, UseMutationResult, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const blogDislike = (
    params: TBlogDislike
): Promise<AxiosResponse<TBlogDislikeResponse>> => 
    Http.post(`/News/NewsDissLike/${params.BlogId}`)

// this should use in components

export const useBlogDislike = (): UseMutationResult<
    AxiosResponse<TBlogDislikeResponse, any>,
    unknown,
    TBlogDislike,
    unknown
    > => {
        const client = useQueryClient();

        return useMutation({
            mutationFn: blogDislike,
            onSuccess: () => {
              toast.success("درخواست شما با موفقیت ثبت شد") // toast success
              client.invalidateQueries({ queryKey: ["blogDetail"] }); // client FN
            },
            onError:(err:any)=>{
              toast.error(err)
              console.log(err)
            }
          });
    }