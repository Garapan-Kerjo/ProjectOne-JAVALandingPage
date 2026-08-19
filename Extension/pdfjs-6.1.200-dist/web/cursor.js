const cursor = document.querySelector(".cursor");

window.addEventListener("mouseout", (e) => {

    if (!e.relatedTarget) {

        cursor.style.opacity = "0";

        window.parent.postMessage({
            type: "pdf-mouseleave"
        }, "*");

    }

});

window.addEventListener("mouseover", () => {

    cursor.style.opacity = "1";

    window.parent.postMessage({
        type: "pdf-mouseenter"
    }, "*");

});

document.addEventListener("mousemove", e => {
    if (!cursor) return;
    cursor.style.left = e.clientX + "px";
    cursor.style.top = e.clientY + "px";
});
