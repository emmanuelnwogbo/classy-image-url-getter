/**
 * Scan for unparsed images
 * - Applies ".parsed" so that we don't parse it again
 * - Adds a 👍👎 button to toggle image
 */
const classyImages = [];
const parseImages = function() {
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
      classyImages[index].isSelected = !classyImages[index].isSelected;
      $toggle.textContent = classyImages[index].isSelected ? "👍" : "👎";
      $parent.style.opacity = classyImages[index].isSelected ? 1 : 0.35;
      updateImageList();
    });
  });
};

/**
 * Use an interval to handle infinite scrolling
 */
setInterval(() => {
  parseImages();
}, 500);

/**
 * Updates the image list
 */
const updateImageList = function() {
  let urls = "";

  $text.value = classyImages.forEach(image => {
    if (image.isSelected) urls += `${image.url}\n`;
  });

  $text.value = urls;
};

/**
 * Main UI
 */
const $container = document.createElement("div");
$container.style.position = "fixed";
$container.style.left = "0";
$container.style.bottom = "0";
$container.style.zIndex = "9999";
$container.style.width = "100%";
$container.style.padding = "20px";
$container.style.boxSizing = "border-box";
$container.style.background = "rgba(255, 255, 255, 0.85)";
document.body.appendChild($container);

const $download = document.createElement("button");
$download.textContent = "Download 💾";
$download.style.fontSize = "18px";
$download.style.marginBottom = "20px";
$container.appendChild($download);

const $text = document.createElement("textarea");
$text.style.display = "block";
$text.style.width = "100%";
$text.style.height = "150px";
$container.appendChild($text);

/**
 * Hand download
 */
$download.addEventListener("click", () => {
  let $a = document.createElement("a");
  let file = new Blob([$text.value], {
    type: "application/text"
  });
  $a.href = URL.createObjectURL(file);
  $a.download = `classy-urls.txt`;
  $a.click();
  $a.remove();
});

/**
 * Finally, run everything once
 */
parseImages();
updateImageList();
