

export const generatePaginationNumbers = (
  currentPage: number,
  totalPages: number
) => {
  // Si el numero total de paginas es 7 o menos vamos a mostrar las paginas sin puntos suspensivos

  if (totalPages <= 7)
    return Array.from({ length: totalPages }, (_, i) => i + 1); //  [1, 2, 3, 4, 5, 6, 7]

  //   Si la pagina actual esta en las primeras 3 paginas
  // mostras las primeras 3, punto suspensivos y despues las ultimas 2

  if (currentPage <= 3) {
    return [1, 2, 3, "...", totalPages - 1, totalPages]; //  [1, 2, 3, "...", 13, 14]
  }

  // Si la pagina actual esta dentro de las ultimas 3
  // Mostrar las primeras 2, puntos susoensivos, las ultimas 3
  if (currentPage >= totalPages - 2) {
    return [1, 2, "...", totalPages - 1, totalPages]; //  [1, 2, "...", 13, 14]
  }

  // Si la pagina esta en otro lugar medio
  // mostrar la primera pagina, puntos suspensivos, la pagina actual y vecinos
  return [
    1,
    "...",
    currentPage - 1,
    currentPage,
    currentPage + 1,
    "...",
    totalPages,
  ];
};
