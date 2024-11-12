import React, { useState } from 'react';
import axios from 'axios';

const ReviewForm = ({ bookId, userId, onNewReview }) => {
  const [rating, setRating] = useState(1);
  const [comment, setComment] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/reviews', {
        bookId,
        userId,
        rating,
        comment
      });
      onNewReview(response.data); // Atualiza a lista de avaliações ao adicionar uma nova
      setRating(1); // Redefine a nota
      setComment(''); // Redefine o comentário
    } catch (error) {
      console.error('Erro ao enviar a avaliação:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Deixe sua Avaliação</h3>
      <label>
        Nota:
        <select value={rating} onChange={(e) => setRating(Number(e.target.value))}>
          {[1, 2, 3, 4, 5].map(num => (
            <option key={num} value={num}>{num}</option>
          ))}
        </select>
      </label>
      <br />
      <label>
        Comentário:
        <textarea value={comment} onChange={(e) => setComment(e.target.value)} />
      </label>
      <br />
      <button type="submit">Enviar Avaliação</button>
    </form>
  );
};

export default ReviewForm;
