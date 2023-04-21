export const convertGradeToOrder = (grade) => {
  switch (grade) {
    case "BRONZE":
      return 1;
    case "SILVER":
      return 2;
    case "GOLD":
      return 3;
    case "PLATINUM":
      return 4;
    case "DIAMOND":
      return 5;
    default:
      return 1;
  }
};

export const orderByGrade = (type) => (prev, next) => {
  if (type === "desc") {
    return convertGradeToOrder(next.grade) - convertGradeToOrder(prev.grade);
  }
  return convertGradeToOrder(prev.grade) - convertGradeToOrder(next.grade);
};

export const orderByName = (type) => (prev, next) => {
  if (type === "desc") {
    return prev.name > next.name ? 1 : -1;
  }
  return next.name > prev.name ? 1 : -1;
};

export const orderByPrice = (type) => (prev, next) => {
  console.log("prev : ", prev.price , "next : ",next.price);
  if (type === "desc") {
    return next.price - prev.price;
  }
  return prev.price - next.price;
};

export const orderByRegisterDate = (type) => (prev, next) => {
  const prevDate = new Date(prev.register_date).getTime();
  const nextDate = new Date(next.register_date).getTime();

  if (type === "desc") {
    return nextDate - prevDate;
  }
  return prevDate - nextDate;
};
export const orderByLikes = (type) => (prev, next) => {
  return next.likes - prev.likes;
};
