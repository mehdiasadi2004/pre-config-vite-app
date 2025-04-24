import { AxiosResponse } from "axios";
import Http from "../../interceptor/index.interceptor";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

// types
import { TBlogDetail } from "./type";



// detail
export const blogDetail = (
  params: TBlogDetail
): Promise<AxiosResponse<any>> =>
  Http.get(`/News/${params.BlogId}`);

// this should use in components
export const useBlogDetail = (
  params: TBlogDetail // params
): UseQueryResult<any, any> =>
  useQuery({
    queryKey: ["blogDetail", params.BlogId], // key
    queryFn: () => blogDetail(params), // function
  });
