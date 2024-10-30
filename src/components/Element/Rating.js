export const Rating = ({ rating }) => {
    let ratingArray = Array(5).fill(false);
    for (let i = 0; i < rating; i++) {
        ratingArray[i] = true;
    }
    return (
        <>
            {ratingArray.map((value, index) => (// value and index is a predefined parameters
                value ? (
                    <i key={index} className="text-lg bi bi-star-fill text-yellow-500  mr-1"></i>
                ) : (
                    <i key={index} className="text-lg bi bi-star text-yellow-500  mr-1"></i>
                )
            ))}
        </>
    )
}



// example
// const arr = [10, 20, 30];

// arr.map((value, index) => {
//   console.log(value, index);
// });
// Output:

// Copy code
// 10 0
// 20 1
// 30 2