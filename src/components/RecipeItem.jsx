function RecipeItem({ recipe, onDelete, onEdit }) {
  return (
    <div className="recipe-item">
      <h3>{recipe.name}</h3>
      <p>{recipe.description}</p>
      <button onClick={() => onDelete(recipe.name)}>Eliminar</button>
      <button onClick={() => onEdit(recipe)}>Editar</button>
    </div>
  );
}

export default RecipeItem;
