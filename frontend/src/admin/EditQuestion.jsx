import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const EditQuestion = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    question: "",
    options: ["", "", "", ""],
    answer: "",
    unit: ""
  });

  useEffect(() => {
    axios.get(`http://localhost:5000/api/quiz/questions/${id}`)
      .then((res) => setFormData(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  const handleChange = (e, index) => {
    if (index !== undefined) {
      const updatedOptions = [...formData.options];
      updatedOptions[index] = e.target.value;
      setFormData({ ...formData, options: updatedOptions });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.put(`http://localhost:5000/api/admin/questions/${id}`, formData, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    navigate("/admin/manage-questions");
  };

  return (
    <div>
      <h2>Edit Question</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="question"
          value={formData.question}
          onChange={handleChange}
          placeholder="Question"
        />
        {formData.options.map((opt, idx) => (
          <input
            key={idx}
            type="text"
            value={opt}
            onChange={(e) => handleChange(e, idx)}
            placeholder={`Option ${idx + 1}`}
          />
        ))}
        <input
          type="text"
          name="answer"
          value={formData.answer}
          onChange={handleChange}
          placeholder="Correct Answer"
        />
        <input
          type="text"
          name="unit"
          value={formData.unit}
          onChange={handleChange}
          placeholder="Unit Name"
        />
        <button type="submit">Update Question</button>
      </form>
    </div>
  );
};

export default EditQuestion;
