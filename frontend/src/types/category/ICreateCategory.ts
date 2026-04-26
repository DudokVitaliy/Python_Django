import type {RcFile} from "antd/es/upload";
import type {UploadFile} from "antd";

export interface ICreateCategory {
    name: string;
    slug: string;
    description: string;
    image: RcFile | null | UploadFile | Array<UploadFile>;
}