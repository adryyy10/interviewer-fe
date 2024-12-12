import queryString from "query-string";
import { useLocation } from "react-router-dom";

export const useQueryCategories = () => {
    const location = useLocation(); // url in web browser
    const parsed = queryString.parse(location.search, { arrayFormat: "bracket" }); // Parse arrays in query string
    const categories = Array.isArray(parsed.category)
      ? (parsed.category as string[])
      : parsed.category
      ? [parsed.category as string]
      : null;

    return {categories, location };
}