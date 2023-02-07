<!-- @format -->

# Console-Finances

## Description

I have created a Finance Analysis using JavaScript which calculates the following:

- The total number of months included in the dataset.

- The net total amount of Profit/Losses over the entire period.

- The average of the changes in Profit/Losses over the entire period.

  - You will need to track what the total change in profits are from month to month and then find the average.
  - (`Total/Number of months`)

- The greatest increase in profits (date and amount) over the entire period.

- The greatest decrease in losses (date and amount) over the entire period.

![HTML Page & Console](./starter/Images/HTML%26Console.png)

## Installation

N/A

## Usage

- To begin with, I accessed the nested array and created two separate arrays using the _push()_ method - one for the months and the other for the profits/losses. However, upon further inspection, I noticed that the elements in the new arrays were being counted twice due to the double iteration used to access the inner arrays. As a result, I created new arrays to remove duplicates by only including elements with even indices.
- I calculated the number of months by using the _length_ method.

  ![JS-Code-snippet](./starter/Images/Screenshot%202022-12-16%20at%2021.09.34.png)

- I then determined the total amount of profits and losses by creating a new variable, **totalAmount**, setting the inital value to 0 and then interating through the **sums** array in order to add the elements and store the sum in the **totalAmount** variable.

  ![JS-Code-snippet](./starter/Images/Screenshot%202022-12-16%20at%2021.14.20.png)

- Next, I determined the average of the changes in Profit/Losses by creating an array called **changes** and iterating through the _sums_ array to find the difference between consecutive elements, which I added to the **changes** array. I then created the **total** variable by summing the elements in the **changes** array, and the **averageChange** variable by dividing the total by the number of months minus one (since there are 86 months, but only 85 changes). I used the _toFixed(2)_ method to display only two decimal points.

  ![JS-Code-snippet](./starter/Images/Screenshot%202022-12-16%20at%2021.14.39.png)

- For the greatest increase/decrease, I first declared the variables **maxIncrease** and **maxDecrease** and assigned the first element of the **changes** array to them. I then used a _for loop_ to iterate through the **changes** array starting at the second element and compare the values of **maxIncrease**/**maxDecrease** to the current element. If the variables were greater/lower than the current element, I replaced their values with the current element. As I had used separate arrays for the months and changes, I then created two variables for the best and worst months and assigned them the indices of the **maxIncrease** and **maxDecrease** elements, respectively. I used these variables _plus one_ as indices for the months array (plus one because there are 85 changes and 86 months, and the first month cannot have any changes).

  ![JS-Code-snippet](./starter/Images/Screenshot%202022-12-16%20at%2021.14.58.png)
  ![JS-Code-snippet](./starter/Images/Screenshot%202022-12-16%20at%2021.15.09.png)

## Credits

N/A

## License

MIT License

## Badges

N/A

## Features

N/A

## How to Contribute

N/A

## Tests

N/A


