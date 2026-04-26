import { useGetCategoriesQuery } from "../services/categoryService";
import { Link } from "react-router-dom";

const CategoryListPage = () => {
    const { data, isLoading } = useGetCategoriesQuery();

    if (isLoading) return <p>Loading...</p>;

    return (
        <div>
            <h1>Категорії</h1>

            {data?.map((item: any) => (
                <div key={item.id}>
                    <p>{item.name}</p>

                    <Link to={`/edit/${item.id}`}>Edit</Link>
                    <Link to={`/delete/${item.id}`}>Delete</Link>
                </div>
            ))}
        </div>
    );
};

export default CategoryListPage;