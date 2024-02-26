import MealItem from './meal-item';
import Link from 'next/link';
import classes from './meals-grid.module.css'

export default function MealsGrid({ meals }) {
  return (

      <ul className={classes.meals}>
        {meals.map((meal) => (
          <li key={meal.id}>
            <Link href={`/meals/${meal.slug}`}>
              <MealItem {...meal} />
            </Link>
          </li>
        ))}
      </ul>
  );
}