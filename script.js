/**
 * Scan for unparsed images
 * - Applies ".parsed" so that we don't parse it again
 * - Adds a 👍👎 button to toggle image
 */
classyImages = [];
parseImages = function() {
  const $imgs = document.querySelectorAll(
    ".rg_di:not(.classy-parsed) .rg_meta"
  );

  $imgs.forEach(el => {
    const $parent = el.parentElement;
    const index = classyImages.length;

    $parent.classList.add("classy-parsed");
    $parent.style.marginBottom = "60px";
    classyImages.push({
      $parent,
      url: JSON.parse(el.textContent).ou,
      isSelected: true
    });

    // Create and style the toggle
    const $toggle = document.createElement("button");
    $toggle.classList.add("classy-toggle");
    $toggle.textContent = "👍";
    $toggle.style.fontSize = "18px";
    $toggle.style.width = "100%";
    $parent.appendChild($toggle);

    // Toggle the class and update our list of images
    $toggle.addEventListener("click", () => {
      console.log(
        "clicked",
        index,
        classyImages[index],
        classyImages[index].isSelected
      );
      classyImages[index].isSelected = !classyImages[index].isSelected;
      $toggle.textContent = classyImages[index].isSelected ? "👍" : "👎";
      $parent.style.opacity = classyImages[index].isSelected ? 1 : 0.35;
    });
  });
};

setInterval(() => {
  parseImages();
}, 500);
