import {Button, Form, Input, Upload} from "antd";
import {useNavigate} from "react-router-dom";
import {InboxOutlined} from "@ant-design/icons";
import type {ICreateCategory} from "../types/category/ICreateCategory.ts";
import {useCreateCategoryMutation} from "../services/categoryService.ts";


const CategoryCreatePage = () => {
    const [form] = Form.useForm<ICreateCategory>();
    const navigate = useNavigate();

    const [createCategory] = useCreateCategoryMutation();

    const onFinish = async(values: ICreateCategory) => {
        try {
            if(values.image !=null && Array.isArray(values.image) && values.image.length>0)
                values.image = values.image[0].originFileObj!
            await createCategory(values).unwrap()
            navigate("/");
        }
        catch(err){
            console.log(err)
        }
    }

    const normFile = (e: any) => {
        console.log('Upload event:', e);

        if (Array.isArray(e)) {
            return e
        }

        const n = e.fileList.length
        if (n < 1) return e.fileList;
        return [e.fileList[n - 1]]

    };
    return (
        <>
            <div className={"min-h-screen xl:flex"}>
                <div className="p-4 mx-auto max-w-(--breakpoint-2xl) md:p-6">
                    <h1 className="mb-4 text-center text-4xl font-bold tracking-tight text-heading md:text-5xl lg:text-6xl">
                        Створення категорії
                    </h1>

                    <div className="overflow-hidden rounded-2xl
                    border border-gray-200 bg-white px-4 pb-3 pt-4
                    dark:border-gray-800 dark:bg-white/3 sm:px-6">

                        <div className="w-full overflow-x-auto">
                            <Form onFinish={onFinish} encType="multipart/form-data"
                                  form={form}
                                  layout={"vertical"}
                            >

                                <Form.Item<ICreateCategory>
                                    label={"Назва категорії"}
                                    name={"name"}
                                    rules={[{required: true, message: "Вкажіть ім'я категорії"}, {
                                        min: 3,
                                        message: "Ім'я категорії повинно мати щонайменше 3 символи"
                                    }, {max: 20}]}
                                >
                                    <Input/>
                                </Form.Item>

                                <Form.Item<ICreateCategory>
                                    label={"Опис категорії"}
                                    name={"description"}
                                    rules={[{required: true, message: "Вкажіть опис категорії"}, {
                                        min: 3,
                                        message: "Опис категорії повинно мати щонайменше 3 символи"
                                    }, {max: 100}]}
                                >
                                    <Input/>
                                </Form.Item>

                                <Form.Item<ICreateCategory>
                                    label={"Слаг"}
                                    name={"slug"}
                                    rules={[{required: true, message: "Вкажіть опис категорії"}, {
                                        min: 3,
                                        message: "Опис категорії повинно мати щонайменше 3 символи"
                                    }, {max: 20}]}
                                >
                                    <Input/>
                                </Form.Item>

                                <Form.Item label="Картинка категорії">
                                    <Form.Item<ICreateCategory> name="image" valuePropName="fileList"
                                                                getValueFromEvent={normFile}
                                                                noStyle>
                                        <Upload.Dragger accept="image/*" listType={"picture"} name="files"
                                                        multiple={false}
                                                        beforeUpload={(file) => {
                                                            if (!file.type.startsWith("image")) {
                                                                return
                                                            }
                                                            return false
                                                        }}>
                                            <p className="ant-upload-drag-icon">
                                                <InboxOutlined/>
                                            </p>
                                            <p className="ant-upload-text">Click or drag file to this area to upload</p>
                                            <p className="ant-upload-hint">Support for a single or bulk upload.</p>
                                        </Upload.Dragger>
                                    </Form.Item>
                                </Form.Item>


                                <Form.Item label={null}>
                                    <Button className="min-w-full" type="primary" htmlType="submit">
                                        Створити
                                    </Button>
                                </Form.Item>

                            </Form>


                        </div>
                    </div>


                </div>
            </div>
        </>

    )
}

export default CategoryCreatePage;