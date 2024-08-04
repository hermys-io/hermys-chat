import { useQuery } from "@tanstack/react-query";
import {  getSignedFile } from "./api";
import { SignFileParams } from "../common/interface";


export const useGetSignedFile = (params: SignFileParams) => {
  return useQuery({
    queryKey: ['get-signed-file', params],
    queryFn: () => getSignedFile(params),
    enabled: !!params.filename,
  });
};