'use server'
import { redirect } from 'next/navigation'
import { saveMeal } from './meals'
import { revalidatePath } from 'next/cache'

function isInvalidText(text) {
  return !text || text.trim() === ''
}

export async function shareMeal(prevState, formData) {
  console.log('fetching meals data')
  const meal = {
    title: formData.get('title'),
    summary: formData.get('summary'),
    instructions: formData.get('instructions'),
    image: formData.get('image'),
    creator: formData.get('name'),
    creator_email: formData.get('email'),
  }

  if (
    !meal.image ||
    isInvalidText(meal.title) ||
    isInvalidText(meal.summary) ||
    isInvalidText(meal.instructions) ||
    // isInvalidText(meal.image) ||
    isInvalidText(meal.creator) ||
    isInvalidText(meal.creator_email) ||
    // !meal.image.startsWith('/images/') ||
    !meal.creator_email.includes('@') || 
    !meal.creator_email.includes('.')
  ) {
    return {
      message: 'Invalid input',

    }
  }
  await saveMeal(meal)
  revalidatePath('/meals');
  redirect('/meals')
}
