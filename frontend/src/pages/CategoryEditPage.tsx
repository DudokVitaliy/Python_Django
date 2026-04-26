import { useParams, useNavigate } from "react-router-dom";
import { useGetCategoryByIdQuery, useUpdateCategoryMutation } from "../services/categoryService";
import { Form, Input, Button } from "antd";

const CategoryEditPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const { data } = useGetCategoryByIdQuery(Number(id));
    const [updateCategory] = useUpdateCategoryMutation();

    const [form] = Form.useForm();

    const onFinish = async (values: any) => {
        await updateCategory({ id, ...values });
        navigate("/categories");
    };

    return (
        <Form form={form} onFinish={onFinish} initialValues={data}>
            <Form.Item name="name">
                <Input placeholder="Name" />
            </Form.Item>

            <Form.Item name="description">
                <Input placeholder="Description" />
            </Form.Item>

            <Button htmlType="submit">Save</Button>
        </Form>
    );
};

export default CategoryEditPage;