var someFunction = () => {
    let i = 5;
    let x = 8; 

    return () => {
        console.log(x);
        console.log(i);
    }
};

console.dir(someFunction());