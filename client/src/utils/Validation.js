export default function validate(input) {
  const errors = {};

  // Validaciones para el formulario
  //* Nombre
  if (!input.name.trim()) errors.name = "El nombre es obligatorio";
  else if (/\d/.test(input.name))
    errors.name = "El nombre no puede contener números";

  //* Peso
  const weightMin = parseFloat(input.weightMin);
  const weightMax = parseFloat(input.weightMax);

  if (!input.weightMin.trim())
    errors.weightMin = "El peso mínimo es obligatorio";
  if (!input.weightMax.trim())
    errors.weightMax = "El peso máximo es obligatorio";
  if (weightMin >= weightMax)
    errors.weightMax = "El peso máximo debe ser mayor que el mínimo";

  //* Altura
  const heightMin = parseFloat(input.heightMin);
  const heightMax = parseFloat(input.heightMax);

  if (!input.heightMin.trim())
    errors.heightMin = "La altura mínima es obligatorio";
  if (!input.heightMax.trim())
    errors.heightMax = "La altura maxima es obligatorio";
  if (heightMin >= heightMax)
    errors.heightMax = "La altura maxima debe ser mayor que la mínimo";

  //* Life Span
  const lifeSpanMin = parseFloat(input.lifeSpanMin);
  const lifeSpanMax = parseFloat(input.lifeSpanMax);

  if (!input.lifeSpanMin.trim())
    errors.lifeSpanMin = "El lifespan mínimo es obligatorio";
  if (!input.lifeSpanMax.trim())
    errors.lifeSpanMax = "El lifespan máximo es obligatorio";
  if (lifeSpanMin >= lifeSpanMax)
    errors.lifeSpanMax = "El lifespan máximo debe ser mayor que el mínimo";

  return errors;
}
