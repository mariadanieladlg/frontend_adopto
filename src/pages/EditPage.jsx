import axios from "axios";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

export const EditPage = () => {
  const { id } = useParams();
  useEffect(() => {
    async function getOnePet() {
      try {
        const response = await axios.get(`http://localhost:5005/pets/${id}`);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    getOnePet();
  }, [id]);
  return <div>EditPage</div>;
};
