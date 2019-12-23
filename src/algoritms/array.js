const addLinked = new LinkedList();
addLinked.uppend(1);
addLinked.add(2);

//Find the smallest and second smallest elements in an array
const ar = [1, 5, 3, 4];
const sorted = ar.sort();
console.log(sorted[1]);

//Find first not repeated numbers

//effective
function firstNonRepeating(arr, n) {
    let myMap = new Map();
    for(let i = 0; i < n; i++) {
        if(myMap.get(arr[i])) {
           myMap.set(arr[i], )
        } else {
            myMap.set(arr[i], 1);
        }
    }
}

function main() {

}
