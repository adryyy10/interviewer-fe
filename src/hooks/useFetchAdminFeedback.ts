import { useEffect, useState } from "react";
import { AxiosResponse } from "axios";
import { HydraMemberResponse } from "../types/api/HydraMemberResponse";
import { fetchAdminFeedback } from "../services/api";
import { Feedback } from "../types/feedback/Feedback";


const useFetchAdminFeedback = () => {
  const [feedbackItems, setFeedbackItems] = useState<Feedback[]>([]);

  useEffect(() => {
    const getFeedback = async () => {
      try {
        const response: AxiosResponse<HydraMemberResponse<Feedback>> = await fetchAdminFeedback();
        setFeedbackItems(response.data['hydra:member']);
      } catch (error) {
        console.error('Error fetching admin feedback:', error);
      }
    };
    getFeedback();
  }, []);

  return { feedbackItems };
}

export default useFetchAdminFeedback;