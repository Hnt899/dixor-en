import { Route, Routes } from "react-router-dom";
import Home9 from "./pages/homePages/Home9";
import NotFoundPage from "./pages/innerPages/NotFoundPage";
import BlogStandardPage from "./pages/blogPages/BlogStandardPage";

// 1. ВОЗВРАЩАЕМ СТРАНИЦУ ДЛЯ ОДНОГО ПОСТА
import BlogSinglePage from "./pages/blogPages/BlogSinglePage";

// Страница деталей проекта
import ProjectDetailsV1Page from "./pages/innerPages/ProjectDetailsV1Page";
// Страница со всеми проектами
import ProjectsPage from "./pages/innerPages/ProjectsPage"; 


const Routers = () => {
    return (
        <>
            <Routes>
                {/* Главная страница */}
                <Route path='/' element={<Home9 />} />

                {/* Страница со СПИСКОМ блогов */}
                <Route path='/blog' element={<BlogStandardPage />} />
                <Route path='/blog?:page' element={<BlogStandardPage />} />

                {/* 2. ДОБАВЛЯЕМ РОУТ ДЛЯ ОДНОГО ПОСТА */}
                {/* :id - это 1, 2, 3 и т.д. из твоего JSON-файла */}
                <Route path='/blog-post/:id' element={<BlogSinglePage />} />

                {/* Страница со всеми проектами */}
                <Route path='/projects' element={<ProjectsPage />} />

                {/* Страница деталей проекта */}
                {/* :id - это 1-36 из PortfolioV1Data.json */}
                <Route path='/project/:id' element={<ProjectDetailsV1Page />} />

                {/* 404 */}
                <Route path='*' element={<NotFoundPage />} />
            </Routes>
        </>
    );
};

export default Routers;