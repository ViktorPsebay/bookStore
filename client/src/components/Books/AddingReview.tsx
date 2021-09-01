import React, { ChangeEvent, FormEvent, useState } from 'react';
import { Button, FormHelperText, TextareaAutosize } from '@material-ui/core';
import { reviewInterface } from '../../types/types';
import { postReview } from '../../api/reviewAPI';
import { Form } from '../../styledComponents/Form';

export const AddingReview = ({publishReview, bookId, userId}: {
  publishReview: () => void,
  bookId: number,
  userId: number | null,
}): JSX.Element => {

  const [reviewLength, setLength] = useState(0);

  const changeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    const len = e.currentTarget.value.length;
    setLength(len);
  };

  const addingHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!userId) return alert('Вы не авторизованы');
    const { textOfReview } = e.currentTarget;
    const review: reviewInterface = {
      bookId,
      userId,
      textOfReview: textOfReview.value,
    };
    if(await postReview(review)) 
      publishReview();
  };

  return (
    <Form onSubmit={addingHandler} >
      <TextareaAutosize 
        name="textOfReview"
        maxRows={8}
        minRows={3}
        style={{width: '70%'}}
        aria-label="review"
        placeholder="Ваш отзыв. Максимальный размер отзыва - 255 символов"
        onChange={changeHandler}
      />

      <FormHelperText error={(reviewLength >= 1000)} style={{marginBottom: '30px'}}>
        {(reviewLength >= 1000) ? `максимальная длина отзыва - 1000 символов, текущая длина - ${reviewLength}` : null}
      </ FormHelperText>

      <Button 
        type="submit"
        variant="contained"
        color="secondary"
        disabled={(reviewLength >= 1000)}
      >
        оставить отзыв
      </Button>
    </Form>
  );
};