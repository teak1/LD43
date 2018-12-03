((window) => {
    function createEnum(...things) {
        var a = new Array(things.length).fill(0).map((a, i) => things[i]),
            b = {};
        a.forEach((c, e) => {
            b[e] = c;
            b[c] = e;
        });
        return b;
    }
    window.exampleEnum = createEnum("a", "b", "c", "d");
    console.log(exampleEnum);
})(window)