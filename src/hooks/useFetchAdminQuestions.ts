import { useEffect, useState } from "react";
import { Question } from "../types";
import { AxiosResponse } from "axios";
import { HydraMemberResponse } from "../types/api/HydraMemberResponse";
import { fetchAdminQuestions } from "../services/api";


const useFetchAdminQuestions = () => {
  const [questions, setQuestions] = useState<Question[]>([]);

  useEffect(() => {
    const getQuestions = async () => {
      try {
        const response: AxiosResponse<HydraMemberResponse<Question>> = await fetchAdminQuestions();
        setQuestions(response.data['hydra:member']);
      } catch (error) {
        console.error('Error fetching admin questions:', error);
      }
    };
    getQuestions();
  }, []);

  return { questions };
}

export default useFetchAdminQuestions;