const addLinked = new LinkedList();
addLinked.uppend(1);
addLinked.add(2);

//Find the smallest and second smallest elements in an array
const ar = [1, 5, 3, 4];
const sorted = ar.sort();
console.log(sorted[1]);

//Find first not repeated numbers
function firstNonRepeating(arr, n) {
    let myMap = new Map();
    for(let i = 0; i < n; i++) {
        let getData =  myMap.get(arr[i]);
        if(getData) {
           myMap.set(arr[i], getData + 1);
        } else {
           myMap.set(arr[i], 1);
        }
    }

    for(let i = 0; i < n; i++) {
        if(myMap.get(arr[i]) === 1) {
            return arr[i];
        }
    }

    return -1;
}

function main(data) {
    let ar = data;
    let len = ar.length;
    let find = firstNonRepeating(ar, len);
    console.log(find);
}

main([9, 4, 9, 6, 7, 4, 6]);

// concat array
const arr1 = [4, 8, 12, 14, 23, 85];
const arr2 = [2, 4, 8, 9, 12, 16];
const sortedArr = arr1.concat(arr2).sort(function (a, b) {
    return a - b;
});
console.log(sortedArr);
