// src/utils.ts
function generateUniqueId() {
  return Date.now().toString(36) + Math.random().toString(36).substring(2, 8);
}

// src/components/image.ts
var LabeledImage = (options) => {
  const label = generateUniqueId();
  return `<figure ${options.centered ? 'style="text-align:center"' : ""} id="${label}">
         <image src="${options.src}" style="width:${options.width || "200px"}">
         <figcaption>${options.cite ? `<a href="${options.cite}"></a>` : options.caption}</figcaption>
    </figure>`;
};

// index.ts
var el = document.getElementById("page");
if (el) {
  el.innerHTML = LabeledImage({ src: "test.jpg", caption: "Gambar", centered: true });
}
