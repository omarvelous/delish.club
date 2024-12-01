const Stars = ({ rating }: { rating: number }) => {
  function className(rating: number, i: number) {
    let className = "fa-regular fa-star";

    if (rating >= i) {
      className = "fa-solid fa-star";
    } else if (i - rating <= 0.5) {
      className = "fa-solid fa-star-half-stroke";
    }

    return className;
  }

  return (
    <>
      <i key={1} aria-hidden="true" className={className(rating, 1)}></i>
      <i key={2} aria-hidden="true" className={className(rating, 2)}></i>
      <i key={3} aria-hidden="true" className={className(rating, 3)}></i>
      <i key={4} aria-hidden="true" className={className(rating, 4)}></i>
      <i key={5} aria-hidden="true" className={className(rating, 5)}></i>
    </>
  );
};

export default Stars;
