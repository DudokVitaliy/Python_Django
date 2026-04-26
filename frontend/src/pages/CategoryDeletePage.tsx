import { useParams, useNavigate } from "react-router-dom";
import { Button } from "antd";
import { useDeleteCategoryMutation } from "../services/categoryService";

const CategoryDeletePage = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [deleteCategory] = useDeleteCategoryMutation();

    const handleDelete = async () => {
        await deleteCategory(Number(id));
        navigate("/categories");
    };

    return (
        <div>
            <h2>Видалити категорію?</h2>
            <Button danger onClick={handleDelete}>Delete</Button>
        </div>
    );
};

export default CategoryDeletePage;