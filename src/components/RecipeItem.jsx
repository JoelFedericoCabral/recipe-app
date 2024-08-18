function RecipeItem({ recipe, onDelete }) {
    return (
      <div className="recipe-item">
        <h3>{recipe.name}</h3>
        <p>{recipe.description}</p>
        <button onClick={() => onDelete(recipe.name)}>Eliminar</button>
      </div>
    );
  }
  

  export default RecipeItem;
  