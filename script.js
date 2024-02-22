const selector = document.getElementById("selector");
const checkboxSide = document.getElementById("checkboxSide");
const productSide = document.getElementById("productSide");

const products = [
  {
    id: 1,
    name: "Eco-friendly Water Bottle",
    category: "Home",
    price: 15,
    tags: ["eco-friendly", "new"],
  },
  {
    id: 2,
    name: "Organic Cotton T-shirt",
    category: "Apparel",
    price: 25,
    tags: ["eco-friendly"],
  },
  {
    id: 3,
    name: "Wireless Headphones",
    category: "Electronics",
    price: 200,
    tags: ["new", "sale"],
  },
];

function setOptions(products) {
  let option = document.createElement("option");
  option.value = "none";
  option.innerText = "none";
  selector.appendChild(option);
  products.forEach((product) => {
    let option = document.createElement("option");
    option.value = product.category;
    option.innerText = product.category;
    selector.appendChild(option);
  });
}

function setCheckbox(products) {
  let uniqueTags = [];
  let checkboxes = [];
  products.forEach((product) => {
    product.tags.forEach((tag) => {
      if (!uniqueTags.includes(tag)) {
        const span = document.createElement("div");
        uniqueTags.push(tag);
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.id = tag;
        checkboxes.push(checkbox);
        const label = document.createElement("label");
        label.for = tag;
        label.innerText = tag;
        span.appendChild(checkbox);
        span.appendChild(label);
        checkboxSide.appendChild(span);
      }
    });
  });
  return [checkboxes, uniqueTags];
}

setOptions(products);
const [checkboxes, uniqueTags] = setCheckbox(products);

function addProducts(products) {
  products.forEach((product) => {
    const block = document.createElement("div");
    block.classList.add("productBlock");
    const h3 = document.createElement("h3");
    h3.textContent = product.name;
    const price = document.createElement("h4");
    price.textContent = `price: ${product.price}$`;
    block.appendChild(h3);
    block.appendChild(price);
    productSide.appendChild(block);
  });
}

function deleteAll() {
  const divs = document.querySelectorAll(".productBlock");
  divs.forEach((block) => block.remove());
}

addProducts(products);
const filters = { category: "none", tag: [...uniqueTags] };

function handleSelect() {
  let selectedOption = selector.options[selector.selectedIndex];
  deleteAll();
  filters.category = selectedOption.value;
  if (filters.category === "none" && filters.tag.length === uniqueTags.length) {
    addProducts(products);
  } else {
    const filtered = products.filter((product) => {
      return (
        filters.category === product.category &&
        filters.tag.every((tag) => product.tags.includes(tag))
      );
    });
    addProducts(filtered);
  }
}

selector.addEventListener("change", handleSelect);

checkboxes.forEach((checkbox) => {
  checkbox.addEventListener("change", () => {
    deleteAll();
    const cbList = [];
    checkboxes.forEach((cb) => {
      if (cb.checked) {
        cbList.push(cb.id);
      }
    });
    filters.tag = cbList;
    filters.tag = filters.tag.length ? filters.tag : [...uniqueTags];
    console.log(filters.tag);
    const filtered = products.filter((product) => {
      return (
        (filters.category === product.category ||
          filters.category === "none") &&
        filters.tag.every((tag) => product.tags.includes(tag))
      );
    });
    addProducts(filtered);
  });
});
